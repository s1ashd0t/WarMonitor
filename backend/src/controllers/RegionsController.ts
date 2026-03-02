import { Request, Response } from 'express'
import { Region } from '../models/Region'

export class RegionsController {
  static async getAllRegions(req: Request, res: Response): Promise<void> {
    try {
      const regions = await Region.find().populate('incidents').populate('news')
      res.json(regions)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch regions' })
    }
  }

  static async getRegionStatus(req: Request, res: Response): Promise<void> {
    try {
      const { regionId } = req.params
      const region = await Region.findById(regionId).populate('incidents').populate('news')

      if (!region) {
        res.status(404).json({ error: 'Region not found' })
        return
      }

      res.json({
        id: region._id,
        name: region.name,
        status: region.status,
        threatLevel: region.threatLevel,
        incidentCount: region.incidents.length,
        newsCount: region.news.length,
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch region status' })
    }
  }

  static async getRegionThreatLevel(req: Request, res: Response): Promise<void> {
    try {
      const { regionId } = req.params
      const region = await Region.findById(regionId)

      if (!region) {
        res.status(404).json({ error: 'Region not found' })
        return
      }

      res.json({
        id: region._id,
        threatLevel: region.threatLevel,
        status: region.status,
        lastUpdated: region.lastUpdated,
      })
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch threat level' })
    }
  }

  static async createRegion(req: Request, res: Response): Promise<void> {
    try {
      const region = new Region(req.body)
      await region.save()
      res.status(201).json(region)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create region' })
    }
  }
}
