import { Trophy, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

import { DASHBOARD_META } from '../config/pollaConfig'
import { STAGE_FILTERS } from '../config/pollaConfig'
import { BONUS_RESULTS, PARTICIPANTS, SCORE_ITEMS } from '../data'
import { MATCH_RESULTS } from '../data'
import { buildLeaderboard } from '../lib/polla'
import type { ScoreItem, StageFilter } from '../types/polla'
import { FilterPanel } from './FilterPanel'
import { LeaderboardTable } from './LeaderboardTable'

const DEFAULT_STAGE: StageFilter = 'fase_grupos'

function getInitialMatchId() {
  return SCORE_ITEMS.find((match) => match.stage === DEFAULT_STAGE)?.id ?? ''
}

export default function DashboardPolla() {
  const [selectedStage, setSelectedStage] = useState<StageFilter>(DEFAULT_STAGE)
  const [selectedMatchId, setSelectedMatchId] = useState<ScoreItem['id'] | ''>(getInitialMatchId())

  const filteredMatches = useMemo(
    () => SCORE_ITEMS.filter((match) => match.stage === selectedStage),
    [selectedStage],
  )

  const activeMatchId = filteredMatches.some((match) => match.id === selectedMatchId)
    ? selectedMatchId
    : filteredMatches[0]?.id ?? ''

  const selectedMatch =
    filteredMatches.find((match) => match.id === activeMatchId) ?? filteredMatches[0] ?? null

  const leaderboard = useMemo(
    () => buildLeaderboard(PARTICIPANTS, SCORE_ITEMS, MATCH_RESULTS, BONUS_RESULTS, activeMatchId),
    [activeMatchId],
  )

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-blue-900 p-6 text-white shadow-lg md:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-800 p-3">
              <Trophy size={32} className="text-yellow-400" />
            </div>

            <div>
              <h1 className="text-2xl font-bold md:text-3xl">{DASHBOARD_META.titulo}</h1>
              <p className="mt-1 text-sm text-blue-200">{DASHBOARD_META.subtitulo}</p>
              <p className="mt-1 text-xs text-blue-300">
                Última actualización base: {DASHBOARD_META.ultimaActualizacion}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2">
            <Users size={20} className="text-blue-300" />
            <span className="font-semibold">{PARTICIPANTS.length} Participantes</span>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FilterPanel
            filteredMatches={filteredMatches}
            selectedMatchId={activeMatchId}
            selectedStage={selectedStage}
            stageFilters={STAGE_FILTERS}
            onMatchChange={setSelectedMatchId}
            onStageChange={setSelectedStage}
          />

          <LeaderboardTable leaderboard={leaderboard} selectedMatch={selectedMatch} />
        </div>
      </div>
    </div>
  )
}
