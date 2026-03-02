'use client'

import { FiGlobe, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi'
import { useDashboardStore } from '@/store/dashboardStore'

export default function Header() {
  const { incidents, articles } = useDashboardStore()
  
  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length
  const highSeverity = incidents.filter(i => i.severity === 'high').length

  return (
    <header className="border-b border-gray-700 bg-geopolitical-light px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiGlobe className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">WarMonitor</h1>
            <p className="text-xs text-gray-400">Real-time Geopolitical Intelligence Dashboard</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-red-400 font-semibold">
              <FiAlertTriangle className="w-5 h-5" />
              <span>{criticalIncidents}</span>
            </div>
            <p className="text-xs text-gray-400">Critical</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-orange-400 font-semibold">
              <FiAlertTriangle className="w-5 h-5" />
              <span>{highSeverity}</span>
            </div>
            <p className="text-xs text-gray-400">High Risk</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-blue-400 font-semibold">
              <FiTrendingUp className="w-5 h-5" />
              <span>{articles.length}</span>
            </div>
            <p className="text-xs text-gray-400">Articles</p>
          </div>
        </div>

        {/* Current Time */}
        <div className="text-right">
          <p className="text-sm font-medium" id="current-time">
            {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs text-gray-400">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </header>
  )
}
