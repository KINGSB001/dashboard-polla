export type BonusKey =
  | 'campeon'
  | 'subcampeon'
  | 'tercer'
  | 'cuarto'
  | 'goleador'
  | 'eq_goleador'
  | 'valla_vencida'

export type StageFilter = 'general' | 'fase_grupos' | 'fase_eliminatoria' | 'bonos'
export type MatchStage = Exclude<StageFilter, 'general' | 'bonos'>

export type MatchId = string

export type MatchScore = {
  t1: number | ''
  t2: number | ''
  clasificado?: string
}

export type MatchPrediction = {
  t1: number
  t2: number
  clasificado?: string
}

export type MatchPredictions = Record<MatchId, MatchPrediction>

export type BonusPredictions = Partial<Record<BonusKey, string>>

export type ParticipantPredictions = {
  partidos: MatchPredictions
  bonos: BonusPredictions
}

export type Participant = {
  id: number
  nombre: string
  correo: string
  predicciones: ParticipantPredictions
}

export type MatchConfig = {
  id: MatchId
  label: string
  stage: MatchStage
  type: 'match'
  t1: string
  t2: string
  fecha: string
}

export type BonusConfig = {
  id: BonusKey
  label: string
  stage: 'bonos'
  type: 'bonus'
  key: BonusKey
}

export type ScoreItem = MatchConfig | BonusConfig

export type MatchResults = Record<MatchId, MatchScore>

export type BonusResults = Partial<Record<BonusKey, string>>

export type LeaderboardEntry = Participant & {
  totalPoints: number
  selectedItemPoints: number | null
  exactHits: number
  outcomeHits: number
  championHit: boolean
  subchampionHit: boolean
  goleadorHit: boolean
}
