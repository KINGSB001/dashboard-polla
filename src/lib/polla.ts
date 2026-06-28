import { BONUS_POINT_RULES, MATCH_POINT_RULES } from '../config/pollaConfig'
import type {
  BonusKey,
  BonusResults,
  LeaderboardEntry,
  MatchConfig,
  MatchStage,
  MatchPrediction,
  MatchScore,
  MatchResults,
  Participant,
  ScoreItem,
} from '../types/polla'

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function isMatchResolved(
  result: MatchScore | undefined,
): result is MatchScore & {
  t1: number
  t2: number
} {
  return typeof result?.t1 === 'number' && typeof result.t2 === 'number'
}

function isBonusResolved(result: string | undefined) {
  return Boolean(result && result.trim())
}

function getStageRule(stage: MatchStage) {
  return stage === 'fase_eliminatoria'
    ? MATCH_POINT_RULES.fase_eliminatoria
    : MATCH_POINT_RULES.fase_grupos
}

function getQualifiedTeamName(
  score: MatchScore | MatchPrediction,
  team1: string,
  team2: string,
) {
  if (typeof score.clasificado === 'string' && score.clasificado.trim()) {
    return score.clasificado
  }

  if (score.t1 > score.t2) {
    return team1
  }

  if (score.t1 < score.t2) {
    return team2
  }

  return undefined
}

function isExactScoreHit(prediction: MatchPrediction, result: MatchScore) {
  return prediction.t1 === Number(result.t1) && prediction.t2 === Number(result.t2)
}

function isQualifiedHit(
  prediction: MatchPrediction,
  result: MatchScore,
  match: MatchConfig,
) {
  const predictedQualified = getQualifiedTeamName(prediction, match.t1, match.t2)
  const actualQualified = getQualifiedTeamName(result, match.t1, match.t2)

  return Boolean(
    predictedQualified &&
      actualQualified &&
      normalizeText(predictedQualified) === normalizeText(actualQualified),
  )
}

export function calculateMatchPoints(
  prediction: MatchPrediction,
  result: MatchScore,
  match: MatchConfig,
) {
  const rules = getStageRule(match.stage)

  const rT1 = Number(result.t1)
  const rT2 = Number(result.t2)

  if (Number.isNaN(rT1) || Number.isNaN(rT2)) {
    return 0
  }

  if (match.stage === 'fase_eliminatoria') {
    let points = 0

    if (isExactScoreHit(prediction, result)) {
      points += rules.marcadorExacto
    }

    if (isQualifiedHit(prediction, result, match)) {
      points += rules.resultadoAcertado
    }

    return points
  }

  if (isExactScoreHit(prediction, result)) {
    return rules.marcadorExacto
  }

  const predDiff = prediction.t1 - prediction.t2
  const realDiff = rT1 - rT2

  if (
    (predDiff > 0 && realDiff > 0) ||
    (predDiff < 0 && realDiff < 0) ||
    (predDiff === 0 && realDiff === 0)
  ) {
    return rules.resultadoAcertado
  }

  return 0
}

function calculateBonusPoints(
  key: BonusKey,
  prediction: string | undefined,
  result: string | undefined,
) {
  const points = BONUS_POINT_RULES[key] ?? 0

  if (!prediction || !result || points === 0) {
    return 0
  }

  return normalizeText(prediction) === normalizeText(result) ? points : 0
}

export function getScoreItemResultLabel(
  item: ScoreItem | null,
  matchResults: MatchResults,
  bonusResults: BonusResults,
) {
  if (!item) {
    return 'Sin elemento seleccionado'
  }

  if (item.type === 'match') {
    const result = matchResults[item.id]

    if (!isMatchResolved(result)) {
      return 'Pendiente'
    }

    const scoreLabel = `${item.t1} ${result.t1} - ${result.t2} ${item.t2}`

    if (item.stage === 'fase_eliminatoria' && result.clasificado) {
      return `${scoreLabel} | Clasifica: ${result.clasificado}`
    }

    return scoreLabel
  }

  const result = bonusResults[item.key]
  return isBonusResolved(result) ? result ?? '' : 'Pendiente'
}

export function buildLeaderboard(
  participants: Participant[],
  items: ScoreItem[],
  matchResults: MatchResults,
  bonusResults: BonusResults,
  selectedItemId: ScoreItem['id'] | '',
) {
  return participants
    .map<LeaderboardEntry>((user) => {
      let totalPoints = 0
      let selectedItemPoints: number | null = null
      let exactHits = 0
      let outcomeHits = 0
      let championHit = false
      let subchampionHit = false
      let goleadorHit = false

      items.forEach((item) => {
        if (item.type === 'match') {
          const prediction = user.predicciones.partidos[item.id]
          const result = matchResults[item.id]

          if (!isMatchResolved(result)) {
            if (item.id === selectedItemId) {
              selectedItemPoints = null
            }

            return
          }

          const points = prediction ? calculateMatchPoints(prediction, result, item) : 0
          const exactScoreHit = prediction ? isExactScoreHit(prediction, result) : false
          const partialHit =
            prediction && !exactScoreHit
              ? item.stage === 'fase_eliminatoria'
                ? isQualifiedHit(prediction, result, item)
                : points === getStageRule(item.stage).resultadoAcertado
              : false

          totalPoints += points
          exactHits += exactScoreHit ? 1 : 0
          outcomeHits += partialHit ? 1 : 0

          if (item.id === selectedItemId) {
            selectedItemPoints = points
          }

          return
        }

        if (!isBonusResolved(bonusResults[item.key])) {
          if (item.id === selectedItemId) {
            selectedItemPoints = null
          }

          return
        }

        const points = calculateBonusPoints(item.key, user.predicciones.bonos[item.key], bonusResults[item.key])

        totalPoints += points
        championHit ||= item.key === 'campeon' && points > 0
        subchampionHit ||= item.key === 'subcampeon' && points > 0
        goleadorHit ||= item.key === 'goleador' && points > 0

        if (item.id === selectedItemId) {
          selectedItemPoints = points
        }
      })

      return {
        ...user,
        totalPoints,
        selectedItemPoints,
        exactHits,
        outcomeHits,
        championHit,
        subchampionHit,
        goleadorHit,
      }
    })
    .sort(
      (a, b) =>
        b.totalPoints - a.totalPoints ||
        b.exactHits - a.exactHits ||
        b.outcomeHits - a.outcomeHits ||
        Number(b.championHit) - Number(a.championHit) ||
        Number(b.subchampionHit) - Number(a.subchampionHit) ||
        Number(b.goleadorHit) - Number(a.goleadorHit) ||
        a.nombre.localeCompare(b.nombre, 'es'),
    )
}
