import type { BonusConfig } from '../../types/polla'

export const BONUS_OPTIONS: BonusConfig[] = [
  { id: 'campeon', label: 'Campeón del Mundial', stage: 'bonos', type: 'bonus', key: 'campeon' },
  {
    id: 'subcampeon',
    label: 'Subcampeón del Mundial',
    stage: 'bonos',
    type: 'bonus',
    key: 'subcampeon',
  },
  { id: 'tercer', label: 'Tercer puesto', stage: 'bonos', type: 'bonus', key: 'tercer' },
  { id: 'cuarto', label: 'Cuarto puesto', stage: 'bonos', type: 'bonus', key: 'cuarto' },
  { id: 'goleador', label: 'Goleador del Mundial', stage: 'bonos', type: 'bonus', key: 'goleador' },
  {
    id: 'eq_goleador',
    label: 'Equipo más goleador',
    stage: 'bonos',
    type: 'bonus',
    key: 'eq_goleador',
  },
  {
    id: 'valla_vencida',
    label: 'Valla más vencida',
    stage: 'bonos',
    type: 'bonus',
    key: 'valla_vencida',
  },
]
