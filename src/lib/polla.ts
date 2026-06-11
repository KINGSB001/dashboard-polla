import type { LeaderboardEntry, MatchConfig, MatchScore, Participant, RealScores } from '../types/polla'

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
    return 3
  }

  const predDiff = predT1 - predT2
  const realDiff = rT1 - rT2

  if (
    (predDiff > 0 && realDiff > 0) ||
    (predDiff < 0 && realDiff < 0) ||
    (predDiff === 0 && realDiff === 0)
  ) {
    return 1
  }

  return 0
}

export function buildLeaderboard(
  participants: Participant[],
  matches: MatchConfig[],
  scores: RealScores,
  selectedMatchId: MatchConfig['id'] | '',
) {
  return participants
    .map<LeaderboardEntry>((user) => {
      let totalPoints = 0
      let selectedMatchPoints = 0

      matches.forEach((match) => {
        if (match.type !== 'match') {
          return
        }

        const points = calculatePoints(
          user.predicciones[match.t1],
          user.predicciones[match.t2],
          scores[match.id].t1,
          scores[match.id].t2,
        )

        totalPoints += points

        if (match.id === selectedMatchId) {
          selectedMatchPoints = points
        }
      })

      return {
        ...user,
        totalPoints,
        selectedMatchPoints,
      }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints || a.nombre.localeCompare(b.nombre, 'es'))
}
