import { Server, Socket } from 'socket.io'
import { Incident } from '../models/Incident'
import { NewsArticle } from '../models/NewsArticle'
import { Region } from '../models/Region'

export class RealtimeService {
  private io: Server

  constructor(io: Server) {
    this.io = io
  }

  async setupEventListeners(): Promise<void> {
    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id)

      socket.on('subscribe-region', (regionId: string) => {
        socket.join(`region-${regionId}`)
      })

      socket.on('unsubscribe-region', (regionId: string) => {
        socket.leave(`region-${regionId}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }

  broadcastNewIncident(incident: any): void {
    this.io.emit('new-incident', incident)

    // Also emit to region-specific room
    if (incident.location?.address) {
      this.io.to(`region-${incident.location.address}`).emit('incident-update', incident)
    }
  }

  broadcastNewArticle(article: any): void {
    this.io.emit('new-article', article)

    // Emit to region-specific rooms
    if (article.relevantRegions) {
      article.relevantRegions.forEach((region: string) => {
        this.io.to(`region-${region}`).emit('article-update', article)
      })
    }
  }

  broadcastRegionUpdate(regionId: string, update: any): void {
    this.io.to(`region-${regionId}`).emit('region-update', {
      regionId,
      ...update,
    })
  }

  broadcastAnalysisComplete(analysisId: string, result: any): void {
    this.io.emit('analysis-complete', {
      id: analysisId,
      ...result,
    })
  }

  broadcastConnectionStatus(): void {
    this.io.emit('status', {
      timestamp: new Date(),
      connected: this.io.engine.clientsCount,
    })
  }
}
