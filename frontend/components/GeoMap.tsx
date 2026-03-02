'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import { useDashboardStore } from '@/store/dashboardStore'
import 'leaflet/dist/leaflet.css'

// Fix leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

L.Marker.prototype.setIcon(DefaultIcon)

const severityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#991b1b',
}

export default function GeoMap({ isLoading }: { isLoading: boolean }) {
  const { incidents } = useDashboardStore()

  if (isLoading) {
    return (
      <div className="flex-1 bg-geopolitical-light animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-geopolitical-light">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {incidents.map((incident) => (
          <CircleMarker
            key={incident.id}
            center={[incident.location.lat, incident.location.lng]}
            radius={
              incident.severity === 'critical'
                ? 15
                : incident.severity === 'high'
                ? 12
                : incident.severity === 'medium'
                ? 9
                : 6
            }
            fillColor={severityColors[incident.severity]}
            color={severityColors[incident.severity]}
            weight={2}
            opacity={0.8}
            fillOpacity={0.7}
          >
            <Popup>
              <div className="w-48 p-2">
                <h3 className="font-bold text-gray-900 mb-1">{incident.title}</h3>
                <p className="text-xs text-gray-700 mb-2">{incident.description}</p>
                <div className="flex gap-2 text-xs">
                  <span className={`px-2 py-1 rounded ${
                    incident.severity === 'critical' ? 'bg-red-200 text-red-900' :
                    incident.severity === 'high' ? 'bg-orange-200 text-orange-900' :
                    incident.severity === 'medium' ? 'bg-yellow-200 text-yellow-900' :
                    'bg-green-200 text-green-900'
                  }`}>
                    {incident.severity.toUpperCase()}
                  </span>
                  <span className="bg-gray-200 text-gray-900 px-2 py-1 rounded">{incident.type}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">{new Date(incident.timestamp).toLocaleDateString()}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
