'use client'

import { useDashboardStore } from '@/store/dashboardStore'
import { FiAlertTriangle, FiMapPin, FiClock } from 'react-icons/fi'

export default function IncidentsList({ isLoading }: { isLoading: boolean }) {
  const { incidents, filters } = useDashboardStore()

  const filteredIncidents = incidents.filter((incident) =>
    filters.severityFilter.includes(incident.severity)
  )

  if (isLoading) {
    return (
      <div className="p-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-geopolitical-light rounded-lg p-3 animate-pulse h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="overflow-y-auto h-full p-4 space-y-3">
      {filteredIncidents.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <p className="text-sm">No incidents matching filters</p>
        </div>
      ) : (
        filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className={`rounded-lg p-3 border-l-4 cursor-pointer hover:bg-geopolitical-light transition ${
              incident.severity === 'critical'
                ? 'border-red-500 bg-red-900/10'
                : incident.severity === 'high'
                ? 'border-orange-500 bg-orange-900/10'
                : incident.severity === 'medium'
                ? 'border-yellow-500 bg-yellow-900/10'
                : 'border-green-500 bg-green-900/10'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              <FiAlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{incident.title}</h4>
                <p className="text-xs text-gray-400 truncate">{incident.description}</p>
              </div>
            </div>

            <div className="flex gap-2 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                <span>{incident.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                <span>{new Date(incident.timestamp).toLocaleDateString()}</span>
              </div>
            </div>

            {incident.aiAnalysis && (
              <div className="mt-2 text-xs bg-black/20 rounded p-2">
                <p className="text-gray-300">{incident.aiAnalysis.implications}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
