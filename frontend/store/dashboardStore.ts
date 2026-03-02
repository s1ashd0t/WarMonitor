import { create } from 'zustand'

interface Incident {
  id: string
  title: string
  description: string
  location: { lat: number; lng: number }
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  type: string
  source: string
  tags: string[]
  aiAnalysis?: {
    sentiment: string
    threat_level: number
    implications: string
  }
}

interface NewsArticle {
  id: string
  title: string
  description: string
  content: string
  source: string
  url: string
  imageUrl?: string
  publishedAt: Date
  relevantRegions: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  aiSummary?: string
}

interface Region {
  id: string
  name: string
  status: 'stable' | 'tense' | 'conflict' | 'crisis'
  threatLevel: number
  incidents: Incident[]
  news: NewsArticle[]
}

interface DashboardState {
  incidents: Incident[]
  articles: NewsArticle[]
  regions: Region[]
  selectedRegion: string | null
  filters: {
    severityFilter: string[]
    dateRange: [Date, Date]
    sources: string[]
  }
  
  // Actions
  setIncidents: (incidents: Incident[]) => void
  addIncident: (incident: Incident) => void
  setArticles: (articles: NewsArticle[]) => void
  addArticle: (article: NewsArticle) => void
  setRegions: (regions: Region[]) => void
  setSelectedRegion: (regionId: string | null) => void
  updateFilters: (filters: Partial<DashboardState['filters']>) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  incidents: [],
  articles: [],
  regions: [],
  selectedRegion: null,
  filters: {
    severityFilter: ['high', 'critical'],
    dateRange: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    sources: [],
  },
  
  setIncidents: (incidents) => set({ incidents }),
  addIncident: (incident) => set((state) => ({
    incidents: [incident, ...state.incidents],
  })),
  setArticles: (articles) => set({ articles }),
  addArticle: (article) => set((state) => ({
    articles: [article, ...state.articles],
  })),
  setRegions: (regions) => set({ regions }),
  setSelectedRegion: (regionId) => set({ selectedRegion: regionId }),
  updateFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters },
  })),
}))
