import { POINT_RULES } from '../config/pollaConfig'
import type {
  BonusResults,
  LeaderboardEntry,
  MatchScore,
  Participant,
  ScoreItem,
  MatchResults,
} from '../types/polla'

export function calculatePoints(
  predT1: number,
  predT2: number,
  realT1: MatchScore['t1'],
  realT2: MatchScore['t2'],
) {
  if (realT1 === '' || realT2 === '') {
    return 0
  }

  const rT1 = Number(realT1)
  const rT2 = Number(realT2)

  if (Number.isNaN(rT1) || Number.isNaN(rT2)) {
    return 0
  }

  if (predT1 === rT1 && predT2 === rT2) {
    return POINT_RULES.marcadorExacto
  }

  const predDiff = predT1 - predT2
  const realDiff = rT1 - rT2

  if (
    (predDiff > 0 && realDiff > 0) ||
    (predDiff < 0 && realDiff < 0) ||
    (predDiff === 0 && realDiff === 0)
  ) {
    return POINT_RULES.resultadoAcertado
  }

  return 0
}

export function calculateBonusPoints(prediction: string | undefined, result: string | undefined) {
  if (!prediction || !result) {
    return 0
  }

  return prediction.trim().toLowerCase() === result.trim().toLowerCase()
    ? POINT_RULES.bonoCorrecto
    : 0
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
      let selectedItemPoints = 0

      items.forEach((item) => {
        if (item.type === 'match') {
          const prediction = user.predicciones.partidos[item.id]
          const result = matchResults[item.id]
          const points = prediction
            ? calculatePoints(prediction.t1, prediction.t2, result?.t1 ?? '', result?.t2 ?? '')
            : 0

          totalPoints += points

          if (item.id === selectedItemId) {
            selectedItemPoints = points
          }

          return
        }

        const points = calculateBonusPoints(
          user.predicciones.bonos[item.key],
          bonusResults[item.key],
        )

        totalPoints += points

        if (item.id === selectedItemId) {
          selectedItemPoints = points
        }
      })

      return {
        ...user,
        totalPoints,
        selectedItemPoints,
      }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints || a.nombre.localeCompare(b.nombre, 'es'))
}
