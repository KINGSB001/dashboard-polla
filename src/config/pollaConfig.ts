import type { StageFilter } from '../types/polla'

export const DASHBOARD_META = {
  titulo: 'Polla Mundialista 2026',
  subtitulo: 'Dashboard de predicciones, resultados y puntajes',
  ultimaActualizacion: '11 de junio de 2026',
} as const

export const POINT_RULES = {
  marcadorExacto: 3,
  resultadoAcertado: 1,
  bonoCorrecto: 5,
} as const

export const STAGE_FILTERS: { id: StageFilter; label: string }[] = [
  { id: 'fase_grupos', label: 'Fase de grupos' },
  { id: 'fase_eliminatoria', label: 'Fase eliminatoria' },
  { id: 'bonos', label: 'Bonos' },
]
