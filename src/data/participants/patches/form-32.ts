import type { MatchPredictions } from '../../../types/polla'

export const FORM_32_MATCH_PATCHES: Partial<Record<number, MatchPredictions>> = {
  1: { match101: { t1: 1, t2: 2, clasificado: 'España' } },
  2: { match101: { t1: 3, t2: 2, clasificado: 'Francia' } },
  3: { match101: { t1: 2, t2: 2, clasificado: 'España' } },
  4: { match101: { t1: 2, t2: 3, clasificado: 'España' } },
  5: { match101: { t1: 1, t2: 2, clasificado: 'España' } },
  6: { match101: { t1: 2, t2: 1, clasificado: 'Francia' } },
  7: { match101: { t1: 1, t2: 1, clasificado: 'España' } },
  8: { match101: { t1: 2, t2: 3, clasificado: 'España' } },
  9: { match101: { t1: 1, t2: 0, clasificado: 'España' } },
  10: { match101: { t1: 1, t2: 2, clasificado: 'España' } },
}
