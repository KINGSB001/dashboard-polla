import { BONUS_OPTIONS } from './matches/bonusOptions'
import { GROUP_STAGE_MATCHES } from './matches/groupStage'
import { KNOCKOUT_STAGE_MATCHES } from './matches/knockoutStage'
import { PARTICIPANTS_BATCH_01 } from './participants/batch-01'
import { PARTICIPANTS_BATCH_02 } from './participants/batch-02'
import { BONUS_RESULTS } from './results/bonusResults'
import { MATCH_RESULTS } from './results/matchResults'

export const PARTICIPANTS = [...PARTICIPANTS_BATCH_01, ...PARTICIPANTS_BATCH_02]

export const MATCHES = [...GROUP_STAGE_MATCHES, ...KNOCKOUT_STAGE_MATCHES]

export const SCORE_ITEMS = [...MATCHES, ...BONUS_OPTIONS]

export { BONUS_OPTIONS, BONUS_RESULTS, GROUP_STAGE_MATCHES, KNOCKOUT_STAGE_MATCHES, MATCH_RESULTS }
