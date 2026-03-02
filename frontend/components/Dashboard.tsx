'use client'

import { useEffect, useState } from 'react'
import Header from './Header'
import GeoMap from './GeoMap'
import IncidentsList from './IncidentsList'
import NewsPanel from './NewsPanel'
import ThreatAnalysis from './ThreatAnalysis'
import { useWebSocket } from '@/hooks/useWebSocket'
import { useDashboardStore } from '@/store/dashboardStore'
import { incidentsAPI, newsAPI, regionsAPI } from '@/lib/api'

export default function Dashboard() {
  const { socket, isConnected } = useWebSocket()
  const [isLoading, setIsLoading] = useState(true)
  const { setIncidents, setArticles, setRegions } = useDashboardStore()

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true)
        const [incidents, articles, regions] = await Promise.all([
          incidentsAPI.getAllIncidents(),
          newsAPI.getLatestArticles(50),
          regionsAPI.getAllRegions(),
        ])
        
        setIncidents(incidents)
        setArticles(articles)
        setRegions(regions)
      } catch (error) {
        console.error('Failed to load dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialData()
  }, [setIncidents, setArticles, setRegions])

  return (
    <div className="flex flex-col h-screen bg-geopolitical-dark text-white overflow-hidden">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Main Map Area */}
        <div className="flex-1 flex flex-col">
          <GeoMap isLoading={isLoading} />
        </div>

        {/* Right Sidebar */}
        <div className="w-96 border-l border-gray-700 flex flex-col overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-700">
            <button className="flex-1 px-4 py-3 text-sm font-medium border-b-2 border-blue-500 hover:bg-geopolitical-light transition">
              Incidents
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium border-b-2 border-transparent hover:bg-geopolitical-light transition">
              News
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium border-b-2 border-transparent hover:bg-geopolitical-light transition">
              Analysis
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <IncidentsList isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Bottom Panel - News Feed */}
      <div className="h-64 border-t border-gray-700 overflow-hidden">
        <NewsPanel isLoading={isLoading} />
      </div>

      {/* Connection Status */}
      <div className="fixed bottom-4 right-4">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
          isConnected ? 'bg-green-900 text-green-100' : 'bg-red-900 text-red-100'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
          <span className="text-xs font-medium">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
    </div>
  )
}
