import { Request, Response } from 'express'
import { aiAnalysisService } from '../services/AIAnalysisService'
import { Incident } from '../models/Incident'

export class AIController {
  static async analyzeSentiment(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body

      if (!text) {
        res.status(400).json({ error: 'Text is required' })
        return
      }

      const sentiment = await aiAnalysisService.analyzeSentiment(text)
      res.json({ sentiment })
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze sentiment' })
    }
  }

  static async generateThreatAnalysis(req: Request, res: Response): Promise<void> {
    try {
      const { incidents } = req.body

      if (!incidents || !Array.isArray(incidents)) {
        res.status(400).json({ error: 'Incidents array is required' })
        return
      }

      const analysis = await aiAnalysisService.generateGeopoliticalSummary(incidents)
      res.json({ analysis })
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate threat analysis' })
    }
  }

  static async generateSummary(req: Request, res: Response): Promise<void> {
    try {
      const { timeframe = 'day' } = req.query

      const startDate = new Date()
      if (timeframe === 'day') {
        startDate.setDate(startDate.getDate() - 1)
      } else if (timeframe === 'week') {
        startDate.setDate(startDate.getDate() - 7)
      } else if (timeframe === 'month') {
        startDate.setMonth(startDate.getMonth() - 1)
      }

      const incidents = await Incident.find({
        timestamp: { $gte: startDate },
      })

      const summary = await aiAnalysisService.generateGeopoliticalSummary(incidents)
      res.json({ summary, incidentCount: incidents.length })
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate summary' })
    }
  }
}
