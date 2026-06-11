import { Trophy, Users } from 'lucide-react'
import { useMemo, useState } from 'react'

import { INITIAL_DATA, MATCHES, REAL_SCORES, STAGE_FILTERS } from '../data/pollaData'
import { buildLeaderboard } from '../lib/polla'
import type { MatchConfig, StageFilter } from '../types/polla'
import { FilterPanel } from './FilterPanel'
import { LeaderboardTable } from './LeaderboardTable'

const DEFAULT_STAGE: StageFilter = 'fase_grupos'

function getInitialMatchId() {
  return MATCHES.find((match) => match.stage === DEFAULT_STAGE)?.id ?? ''
}

export default function DashboardPolla() {
  const [selectedStage, setSelectedStage] = useState<StageFilter>(DEFAULT_STAGE)
  const [selectedMatchId, setSelectedMatchId] = useState<MatchConfig['id'] | ''>(getInitialMatchId())

  const filteredMatches = useMemo(
    () => MATCHES.filter((match) => match.stage === selectedStage),
    [selectedStage],
  )

  const activeMatchId = filteredMatches.some((match) => match.id === selectedMatchId)
    ? selectedMatchId
    : filteredMatches[0]?.id ?? ''

  const selectedMatch =
    filteredMatches.find((match) => match.id === activeMatchId) ?? filteredMatches[0] ?? null

  const leaderboard = useMemo(
    () => buildLeaderboard(INITIAL_DATA, MATCHES, REAL_SCORES, activeMatchId),
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
              <h1 className="text-2xl font-bold md:text-3xl">Polla Mundialista 2026</h1>
              <p className="mt-1 text-sm text-blue-200">Dashboard de predicciones y puntajes</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2">
            <Users size={20} className="text-blue-300" />
            <span className="font-semibold">{INITIAL_DATA.length} Participantes</span>
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
