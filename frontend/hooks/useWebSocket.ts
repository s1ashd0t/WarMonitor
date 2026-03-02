import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { initializeWebSocket, disconnectWebSocket } from '@/lib/websocket'

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const ws = initializeWebSocket()

    ws.on('connect', () => {
      setIsConnected(true)
    })

    ws.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(ws)

    return () => {
      disconnectWebSocket()
    }
  }, [])

  return { socket, isConnected }
}
