import mongoose, { Schema, Document } from 'mongoose'

export interface IIncident extends Document {
  title: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  severity: 'low' | 'medium' | 'high' | 'critical'
  type: string
  source: string
  tags: string[]
  timestamp: Date
  content: string
  aiAnalysis?: {
    sentiment: string
    threat_level: number
    implications: string
    keywords: string[]
  }
  relatedArticles: string[]
}

const IncidentSchema = new Schema<IIncident>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
      index: true,
    },
    type: { type: String, required: true },
    source: { type: String, required: true },
    tags: [String],
    timestamp: { type: Date, default: Date.now, index: true },
    content: String,
    aiAnalysis: {
      sentiment: String,
      threat_level: Number,
      implications: String,
      keywords: [String],
    },
    relatedArticles: [String],
  },
  { timestamps: true }
)

export const Incident = mongoose.model<IIncident>('Incident', IncidentSchema)
