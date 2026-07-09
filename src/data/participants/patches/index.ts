import type { MatchPredictions } from '../../../types/polla'
import { FORM_15_MATCH_PATCHES } from './form-15'
import { FORM_16_MATCH_PATCHES } from './form-16'
import { FORM_17_MATCH_PATCHES } from './form-17'
import { FORM_19_MATCH_PATCHES } from './form-19'
import { FORM_20_MATCH_PATCHES } from './form-20'
import { FORM_21_MATCH_PATCHES } from './form-21'
import { FORM_22_MATCH_PATCHES } from './form-22'
import { FORM_23_MATCH_PATCHES } from './form-23'
import { FORM_24_MATCH_PATCHES } from './form-24'
import { FORM_25_MATCH_PATCHES } from './form-25'
import { FORM_26_MATCH_PATCHES } from './form-26'
import { FORM_27_MATCH_PATCHES } from './form-27'
import { FORM_28_MATCH_PATCHES } from './form-28'
import { FORM_29_MATCH_PATCHES } from './form-29'

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
  FORM_20_MATCH_PATCHES,
  FORM_21_MATCH_PATCHES,
  FORM_22_MATCH_PATCHES,
  FORM_23_MATCH_PATCHES,
  FORM_24_MATCH_PATCHES,
  FORM_25_MATCH_PATCHES,
  FORM_26_MATCH_PATCHES,
  FORM_27_MATCH_PATCHES,
  FORM_28_MATCH_PATCHES,
  FORM_29_MATCH_PATCHES,
)
