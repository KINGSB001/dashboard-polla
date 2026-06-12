import type { LeaderboardEntry, ScoreItem } from '../types/polla'

type LeaderboardTableProps = {
  leaderboard: LeaderboardEntry[]
  selectedMatch: ScoreItem | null
}

function getRankBadgeClass(index: number) {
  if (index === 0) {
    return 'bg-yellow-100 text-yellow-700'
  }

  if (index === 1) {
    return 'bg-slate-200 text-slate-700'
  }

  if (index === 2) {
    return 'bg-amber-100 text-amber-700'
  }

  return 'bg-blue-100 text-blue-700'
}

function renderPrediction(user: LeaderboardEntry, selectedMatch: ScoreItem) {
  if (selectedMatch.type === 'match') {
    const prediction = user.predicciones.partidos[selectedMatch.id]

    if (!prediction) {
      return <span className="text-sm text-slate-400">Sin predicción</span>
    }

    return (
      <div className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 transition-colors group-hover:border-slate-300">
        <span className="font-bold text-slate-700">{prediction.t1}</span>
        <span className="mx-2 text-xs text-slate-400">-</span>
        <span className="font-bold text-slate-700">{prediction.t2}</span>
      </div>
    )
  }

  return (
    <span className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 font-semibold text-slate-700 transition-colors group-hover:border-slate-300">
      {user.predicciones.bonos[selectedMatch.key] || '-'}
    </span>
  )
}

export function LeaderboardTable({ leaderboard, selectedMatch }: LeaderboardTableProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
      <div className="border-b border-slate-100 bg-white p-6">
        <h2 className="text-xl font-bold text-slate-900">Tabla de posiciones</h2>
        <p className="mt-1 text-sm text-slate-500">
          Mostrando predicciones para:{' '}
          <span className="font-semibold text-blue-600">
            {selectedMatch?.label ?? 'Sin elementos cargados'}
          </span>
        </p>
      </div>

      {selectedMatch ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-50 text-sm uppercase tracking-wider text-slate-600">
                <th className="w-1/3 p-4 font-semibold">Participante</th>
                <th className="p-4 text-center font-semibold">Predicción</th>
                <th className="p-4 text-center font-semibold">Puntos obtenidos</th>
                <th className="rounded-tr-xl bg-blue-50 p-4 text-center font-semibold text-blue-800">
                  Total puntos
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {leaderboard.map((user, index) => {
                const isPerfectMatch = user.selectedItemPoints >= 3
                const isPartialMatch = user.selectedItemPoints > 0 && user.selectedItemPoints < 3

                return (
                  <tr key={user.id} className="group transition-colors hover:bg-slate-50/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${getRankBadgeClass(index)}`}
                        >
                          {index + 1}
                        </div>

                        <div>
                          <p className="font-semibold leading-tight text-slate-800">{user.nombre}</p>
                          <p className="text-xs text-slate-500">{user.correo}</p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-center">{renderPrediction(user, selectedMatch)}</td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                          isPerfectMatch
                            ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-200'
                            : isPartialMatch
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {user.selectedItemPoints || '-'}
                      </span>
                    </td>

                    <td className="bg-blue-50/30 p-4 text-center transition-colors group-hover:bg-blue-50/60">
                      <span className="text-xl font-bold text-blue-700">{user.totalPoints}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-slate-500">
          Aún no hay elementos cargados para esta categoría.
        </div>
      )}

      {leaderboard.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          No hay datos de participantes disponibles.
        </div>
      )}
    </div>
  )
}
