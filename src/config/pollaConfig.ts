import type { BonusKey, StageFilter } from '../types/polla'

export const DASHBOARD_META = {
  titulo: 'Polla Mundialista 2026',
  subtitulo: 'Dashboard de predicciones, resultados y puntajes',
  ultimaActualizacion: '29 de junio de 2026',
} as const

export const MATCH_POINT_RULES = {
  fase_grupos: {
    marcadorExacto: 3,
    resultadoAcertado: 1,
  },
  fase_eliminatoria: {
    marcadorExacto: 4,
    resultadoAcertado: 2,
  },
} as const

export const BONUS_POINT_RULES: Partial<Record<BonusKey, number>> = {
  campeon: 15,
  subcampeon: 10,
  tercer: 7,
  cuarto: 5,
  goleador: 10,
  eq_goleador: 5,
}

export const STAGE_FILTERS: { id: StageFilter; label: string }[] = [
  { id: 'general', label: 'General' },
  { id: 'fase_grupos', label: 'Fase de grupos' },
  { id: 'fase_eliminatoria', label: 'Fase eliminatoria' },
  { id: 'bonos', label: 'Bonos' },
]
