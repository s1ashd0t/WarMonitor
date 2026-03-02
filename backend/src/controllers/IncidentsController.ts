import { Request, Response } from 'express'
import { Incident } from '../models/Incident'
import { aiAnalysisService } from '../services/AIAnalysisService'

export class IncidentsController {
  static async getAllIncidents(req: Request, res: Response): Promise<void> {
    try {
      const { severity, limit = 100, skip = 0 } = req.query

      const query: any = {}
      if (severity) query.severity = severity

      const incidents = await Incident.find(query)
        .sort({ timestamp: -1 })
        .limit(Number(limit))
        .skip(Number(skip))

      res.json(incidents)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incidents' })
    }
  }

  static async getIncidentById(req: Request, res: Response): Promise<void> {
    try {
      const incident = await Incident.findById(req.params.id)
      if (!incident) {
        res.status(404).json({ error: 'Incident not found' })
        return
      }
      res.json(incident)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch incident' })
    }
  }

  static async createIncident(req: Request, res: Response): Promise<void> {
    try {
      const incident = new Incident(req.body)
      
      // AI Analysis
      const analysis = await aiAnalysisService.analyzeIncident(
        incident.title,
        incident.description
      )
      incident.aiAnalysis = analysis

      await incident.save()
      res.status(201).json(incident)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create incident' })
    }
  }

  static async analyzeIncident(req: Request, res: Response): Promise<void> {
    try {
      const incident = await Incident.findById(req.params.id)
      if (!incident) {
        res.status(404).json({ error: 'Incident not found' })
        return
      }

      const analysis = await aiAnalysisService.analyzeIncident(
        incident.title,
        incident.description
      )

      incident.aiAnalysis = analysis
      await incident.save()

      res.json({ success: true, analysis })
    } catch (error) {
      res.status(500).json({ error: 'Failed to analyze incident' })
    }
  }
}
