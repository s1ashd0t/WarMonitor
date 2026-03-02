import axios from 'axios'
import { NewsArticle } from '../models/NewsArticle'
import { io } from 'socket.io'

interface NewsSource {
  name: string
  endpoint: string
  parser: (data: any) => any[]
}

export class NewsAggregationService {
  private sources: NewsSource[] = [
    {
      name: 'NewsAPI',
      endpoint: 'https://newsapi.org/v2/everything',
      parser: this.parseNewsAPI,
    },
    {
      name: 'NewsData',
      endpoint: 'https://newsdata.io/api/1/news',
      parser: this.parseNewsData,
    },
  ]

  async fetchLatestNews(): Promise<any[]> {
    const geopoliticalKeywords = [
      'geopolitical',
      'conflict',
      'war',
      'crisis',
      'sanctions',
      'diplomacy',
      'treaty',
      'military',
    ]

    const articles: any[] = []

    for (const source of this.sources) {
      try {
        for (const keyword of geopoliticalKeywords) {
          const response = await axios.get(source.endpoint, {
            params: {
              q: keyword,
              sortBy: 'publishedAt',
              language: 'en',
              apiKey: process.env[`${source.name.toUpperCase()}_API_KEY`],
            },
          })

          const parsed = source.parser(response.data)
          articles.push(...parsed)
        }
      } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error)
      }
    }

    return articles
  }

  private parseNewsAPI(data: any): any[] {
    return (data.articles || []).map((article: any) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source.name,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: new Date(article.publishedAt),
      sentiment: 'neutral',
    }))
  }

  private parseNewsData(data: any): any[] {
    return (data.results || []).map((article: any) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      source: article.source_id,
      url: article.link,
      imageUrl: article.image_url,
      publishedAt: new Date(article.pubDate),
      sentiment: 'neutral',
    }))
  }

  async saveArticles(articles: any[]): Promise<any[]> {
    const saved = []

    for (const article of articles) {
      try {
        const existing = await NewsArticle.findOne({ url: article.url })
        if (!existing) {
          const doc = await NewsArticle.create(article)
          saved.push(doc)
        }
      } catch (error) {
        console.error('Error saving article:', error)
      }
    }

    return saved
  }

  async aggregateByRegion(region: string): Promise<any[]> {
    return await NewsArticle.find({
      relevantRegions: { $in: [region] },
    }).sort({ publishedAt: -1 })
  }
}

export const newsAggregationService = new NewsAggregationService()
