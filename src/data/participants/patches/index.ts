import type { MatchPredictions } from '../../../types/polla'
import { FORM_15_MATCH_PATCHES } from './form-15'
import { FORM_16_MATCH_PATCHES } from './form-16'
import { FORM_17_MATCH_PATCHES } from './form-17'
import { FORM_19_MATCH_PATCHES } from './form-19'

type ParticipantMatchPatchMap = Partial<Record<number, MatchPredictions>>

function mergePatchMaps(...patchMaps: ParticipantMatchPatchMap[]) {
  return patchMaps.reduce<ParticipantMatchPatchMap>((merged, patchMap) => {
    Object.entries(patchMap).forEach(([participantId, predictions]) => {
      merged[Number(participantId)] = {
        ...(merged[Number(participantId)] ?? {}),
        ...predictions,
      }
    })

    return merged
  }, {})
}

export const PARTICIPANT_MATCH_PATCHES = mergePatchMaps(
  FORM_15_MATCH_PATCHES,
  FORM_16_MATCH_PATCHES,
  FORM_17_MATCH_PATCHES,
  FORM_19_MATCH_PATCHES,
)
