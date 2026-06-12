import { Activity, ChevronDown } from 'lucide-react'

import { POINT_RULES } from '../config/pollaConfig'
import type { ScoreItem, StageFilter } from '../types/polla'

type FilterPanelProps = {
  filteredMatches: ScoreItem[]
  selectedMatchId: ScoreItem['id'] | ''
  selectedStage: StageFilter
  stageFilters: { id: StageFilter; label: string }[]
  onMatchChange: (value: ScoreItem['id']) => void
  onStageChange: (value: StageFilter) => void
}

export function FilterPanel({
  filteredMatches,
  selectedMatchId,
  selectedStage,
  stageFilters,
  onMatchChange,
  onStageChange,
}: FilterPanelProps) {
  return (
    <div className="space-y-6 lg:col-span-1">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
          <Activity size={20} className="text-blue-600" />
          Filtros
        </h2>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Categoría</label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStage}
                onChange={(event) => onStageChange(event.target.value as StageFilter)}
              >
                {stageFilters.map((filter) => (
                  <option key={filter.id} value={filter.id}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-3 top-3 text-slate-400"
                size={20}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {selectedStage === 'bonos' ? 'Bono' : 'Partido'}
            </label>

            <div className="relative">
              <select
                className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-slate-700 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:text-slate-400"
                value={selectedMatchId}
                disabled={filteredMatches.length === 0}
                onChange={(event) => onMatchChange(event.target.value as ScoreItem['id'])}
              >
                {filteredMatches.length === 0 ? (
                  <option value="">Sin elementos cargados</option>
                ) : (
                  filteredMatches.map((match) => (
                    <option key={match.id} value={match.id}>
                      {match.label}
                    </option>
                  ))
                )}
              </select>

              <ChevronDown
                className="pointer-events-none absolute right-3 top-3 text-slate-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <h3 className="mb-2 text-sm font-bold text-blue-800">Sistema de puntuación</h3>

        <ul className="space-y-1 text-xs text-blue-700">
          <li>
            • <strong>{POINT_RULES.marcadorExacto} puntos:</strong> acertar el marcador exacto.
          </li>
          <li>
            • <strong>{POINT_RULES.resultadoAcertado} punto:</strong> acertar el ganador o si es empate.
          </li>
          <li>
            • <strong>{POINT_RULES.bonoCorrecto} puntos:</strong> acertar un bono cuando ya tenga resultado.
          </li>
          <li>
            • <strong>0 puntos:</strong> ninguna de las anteriores o resultados aún vacíos.
          </li>
        </ul>
      </div>
    </div>
  )
}
