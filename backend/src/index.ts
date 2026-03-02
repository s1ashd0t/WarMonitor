import express, { Express, Request, Response } from 'express'
import http from 'http'
import { Server as SocketIOServer } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { connectDB } from './utils/database'
import { loggerMiddleware, logger } from './middleware/logger'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import { RealtimeService } from './services/RealtimeService'

// Routes
import incidentsRouter from './routes/incidents'
import newsRouter from './routes/news'
import regionsRouter from './routes/regions'
import aiRouter from './routes/ai'

dotenv.config()

const app: Express = express()
const server = http.createServer(app)
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(loggerMiddleware)

// Realtime Service
const realtimeService = new RealtimeService(io)

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date() })
})

// API Routes
app.use('/api/incidents', incidentsRouter)
app.use('/api/news', newsRouter)
app.use('/api/regions', regionsRouter)
app.use('/api/ai', aiRouter)

// Error Handling
app.use(notFoundHandler)
app.use(errorHandler)

// Initialize Server
const startServer = async () => {
  try {
    // Connect to database
    await connectDB()

    // Setup WebSocket event listeners
    await realtimeService.setupEventListeners()

    // Start periodic news aggregation
    setInterval(async () => {
      try {
        const { newsAggregationService } = await import('./services/NewsAggregationService')
        const articles = await newsAggregationService.fetchLatestNews()
        const saved = await newsAggregationService.saveArticles(articles)
        
        saved.forEach((article) => {
          realtimeService.broadcastNewArticle(article)
        })

        logger.info(`Aggregated ${saved.length} new articles`)
      } catch (error) {
        logger.error('Error in news aggregation:', error)
      }
    }, 60 * 60 * 1000) // Every hour

    server.listen(PORT, () => {
      console.log(`WarMonitor server running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

// Graceful Shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(async () => {
    const { disconnectDB } = await import('./utils/database')
    await disconnectDB()
    process.exit(0)
  })
})

startServer()

export { app, io, realtimeService }
