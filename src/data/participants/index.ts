import type { Participant } from '../../types/polla'
import { PARTICIPANTS_BATCH_01 } from './batch-01'
import { PARTICIPANTS_BATCH_02 } from './batch-02'
import { PARTICIPANTS_BATCH_03 } from './batch-03'
import { PARTICIPANT_MATCH_PATCHES } from './patches'

const BASE_PARTICIPANTS: Participant[] = [
  ...PARTICIPANTS_BATCH_01,
  ...PARTICIPANTS_BATCH_02,
  ...PARTICIPANTS_BATCH_03,
]

export const PARTICIPANTS: Participant[] = BASE_PARTICIPANTS.map((participant) => ({
  ...participant,
  predicciones: {
    ...participant.predicciones,
    partidos: {
      ...participant.predicciones.partidos,
      ...(PARTICIPANT_MATCH_PATCHES[participant.id] ?? {}),
    },
  },
}))
