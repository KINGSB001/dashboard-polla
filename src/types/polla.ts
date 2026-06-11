export type TeamKey = 'México' | 'Sudáfrica' | 'Corea del Sur' | 'República Checa'

export type BonusKey =
  | 'campeon'
  | 'subcampeon'
  | 'tercer'
  | 'cuarto'
  | 'goleador'
  | 'eq_goleador'
  | 'valla_vencida'

export type Predictions = Record<TeamKey, number> & Record<BonusKey, string>

export type Participant = {
  id: number
  nombre: string
  correo: string
  predicciones: Predictions
}

export type StageFilter = 'fase_grupos' | 'fase_eliminatoria' | 'bonos'

export type MatchId = 'match1' | 'match2'

export type MatchScore = {
  t1: number | ''
  t2: number | ''
}

export type MatchConfig =
  | {
      id: MatchId
      label: string
      stage: Exclude<StageFilter, 'bonos'>
      type: 'match'
      t1: TeamKey
      t2: TeamKey
      fecha: string
    }
  | {
      id: BonusKey
      label: string
      stage: 'bonos'
      type: 'bonus'
      key: BonusKey
    }

export type RealScores = Record<MatchId, MatchScore>

export type LeaderboardEntry = Participant & {
  totalPoints: number
  selectedMatchPoints: number
}
