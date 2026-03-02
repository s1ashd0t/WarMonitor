export interface Location {
  lat: number
  lng: number
  address?: string
}

export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type Status = 'stable' | 'tense' | 'conflict' | 'crisis'
export type Sentiment = 'positive' | 'neutral' | 'negative'

export interface Incident {
  id: string
  title: string
  description: string
  location: Location
  severity: Severity
  type: string
  source: string
  tags: string[]
  timestamp: Date
  content: string
  aiAnalysis?: AIAnalysis
  relatedArticles: string[]
}

export interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  source: string
  url: string
  imageUrl?: string
  publishedAt: Date
  relevantRegions: string[]
  sentiment: Sentiment
  aiSummary?: string
  mentions: {
    countries: string[]
    entities: string[]
    incidents: string[]
  }
}

export interface Region {
  id: string
  name: string
  code: string
  coordinates: Location
  status: Status
  threatLevel: number
  incidents: Incident[]
  news: NewsArticle[]
  lastUpdated: Date
  metadata?: {
    population?: number
    gdp?: number
    militaryStrength?: string
  }
}

export interface AIAnalysis {
  sentiment: string
  threat_level: number
  implications: string
  keywords: string[]
}

export interface DashboardFilters {
  severityFilter: Severity[]
  dateRange: [Date, Date]
  sources: string[]
}
