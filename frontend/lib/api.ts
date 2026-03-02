import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const newsAPI = {
  getLatestArticles: async (limit: number = 20) => {
    const response = await apiClient.get('/api/news/latest', { params: { limit } })
    return response.data
  },
  
  getArticlesByRegion: async (region: string) => {
    const response = await apiClient.get(`/api/news/region/${region}`)
    return response.data
  },
  
  searchArticles: async (query: string) => {
    const response = await apiClient.get('/api/news/search', { params: { q: query } })
    return response.data
  },
}

export const incidentsAPI = {
  getAllIncidents: async () => {
    const response = await apiClient.get('/api/incidents')
    return response.data
  },
  
  getIncidentById: async (id: string) => {
    const response = await apiClient.get(`/api/incidents/${id}`)
    return response.data
  },
  
  analyzeIncident: async (id: string) => {
    const response = await apiClient.post(`/api/incidents/${id}/analyze`)
    return response.data
  },
}

export const regionsAPI = {
  getAllRegions: async () => {
    const response = await apiClient.get('/api/regions')
    return response.data
  },
  
  getRegionStatus: async (regionId: string) => {
    const response = await apiClient.get(`/api/regions/${regionId}/status`)
    return response.data
  },
  
  getRegionThreatLevel: async (regionId: string) => {
    const response = await apiClient.get(`/api/regions/${regionId}/threat-level`)
    return response.data
  },
}

export const aiAPI = {
  analyzeSentiment: async (text: string) => {
    const response = await apiClient.post('/api/ai/sentiment', { text })
    return response.data
  },
  
  generateThreatAnalysis: async (incidents: any[]) => {
    const response = await apiClient.post('/api/ai/threat-analysis', { incidents })
    return response.data
  },
  
  generateGeopoliticalSummary: async (timeframe: string = 'day') => {
    const response = await apiClient.get('/api/ai/summary', { params: { timeframe } })
    return response.data
  },
}

export default apiClient
