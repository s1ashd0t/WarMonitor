import { Request, Response } from 'express'
import { NewsArticle } from '../models/NewsArticle'
import { newsAggregationService } from '../services/NewsAggregationService'

export class NewsController {
  static async getLatestArticles(req: Request, res: Response): Promise<void> {
    try {
      const { limit = 50, skip = 0 } = req.query

      const articles = await NewsArticle.find()
        .sort({ publishedAt: -1 })
        .limit(Number(limit))
        .skip(Number(skip))

      res.json(articles)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch articles' })
    }
  }

  static async getArticlesByRegion(req: Request, res: Response): Promise<void> {
    try {
      const { region } = req.params
      const articles = await newsAggregationService.aggregateByRegion(region)
      res.json(articles)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch region articles' })
    }
  }

  static async searchArticles(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query

      const articles = await NewsArticle.find({
        $text: { $search: String(q) },
      }).sort({ publishedAt: -1 })

      res.json(articles)
    } catch (error) {
      res.status(500).json({ error: 'Failed to search articles' })
    }
  }

  static async aggregateNews(req: Request, res: Response): Promise<void> {
    try {
      const articles = await newsAggregationService.fetchLatestNews()
      const saved = await newsAggregationService.saveArticles(articles)
      res.json({ success: true, count: saved.length })
    } catch (error) {
      res.status(500).json({ error: 'Failed to aggregate news' })
    }
  }
}
