import { BONUS_OPTIONS } from './matches/bonusOptions'
import { GROUP_STAGE_FINALS_MATCHES } from './matches/groupStageFinals'
import { GROUP_STAGE_EXTENDED_MATCHES } from './matches/groupStageExtended'
import { GROUP_STAGE_MATCHES } from './matches/groupStage'
import { KNOCKOUT_STAGE_MATCHES } from './matches/knockoutStage'
import { PARTICIPANTS as PARTICIPANT_DATA } from './participants'
import { BONUS_RESULTS } from './results/bonusResults'
import { MATCH_RESULTS } from './results/matchResults'

export const PARTICIPANTS = PARTICIPANT_DATA

export const MATCHES = [
  ...GROUP_STAGE_MATCHES,
  ...GROUP_STAGE_EXTENDED_MATCHES,
  ...GROUP_STAGE_FINALS_MATCHES,
  ...KNOCKOUT_STAGE_MATCHES,
]

export const SCORE_ITEMS = [...MATCHES, ...BONUS_OPTIONS]

export {
  BONUS_OPTIONS,
  GROUP_STAGE_FINALS_MATCHES,
  BONUS_RESULTS,
  GROUP_STAGE_EXTENDED_MATCHES,
  GROUP_STAGE_MATCHES,
  KNOCKOUT_STAGE_MATCHES,
  MATCH_RESULTS,
}
