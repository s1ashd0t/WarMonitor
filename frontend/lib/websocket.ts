import io, { Socket } from 'socket.io-client'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'

let socket: Socket | null = null

export const initializeWebSocket = (): Socket => {
  if (socket) return socket

  socket = io(WS_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  return socket
}

export const getSocket = (): Socket | null => socket

export const disconnectWebSocket = (): void => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const subscribeToIncidents = (
  callback: (incident: any) => void,
  socket: Socket
) => {
  socket.on('new-incident', callback)
}

export const subscribeToNews = (
  callback: (article: any) => void,
  socket: Socket
) => {
  socket.on('new-article', callback)
}

export const subscribeToRegionUpdates = (
  callback: (update: any) => void,
  socket: Socket
) => {
  socket.on('region-update', callback)
}

export const subscribeToAnalysis = (
  callback: (analysis: any) => void,
  socket: Socket
) => {
  socket.on('analysis-complete', callback)
}
