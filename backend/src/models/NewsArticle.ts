import mongoose, { Schema, Document } from 'mongoose'

export interface INewsArticle extends Document {
  title: string
  description: string
  content: string
  source: string
  url: string
  imageUrl?: string
  publishedAt: Date
  fetchedAt: Date
  relevantRegions: string[]
  sentiment: 'positive' | 'neutral' | 'negative'
  aiSummary?: string
  mentions: {
    countries: string[]
    entities: string[]
    incidents: string[]
  }
}

const NewsArticleSchema = new Schema<INewsArticle>(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    content: { type: String },
    source: { type: String, required: true, index: true },
    url: { type: String, required: true, unique: true },
    imageUrl: String,
    publishedAt: { type: Date, default: Date.now, index: true },
    fetchedAt: { type: Date, default: Date.now },
    relevantRegions: [String],
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      default: 'neutral',
    },
    aiSummary: String,
    mentions: {
      countries: [String],
      entities: [String],
      incidents: [String],
    },
  },
  { timestamps: true }
)

export const NewsArticle = mongoose.model<INewsArticle>(
  'NewsArticle',
  NewsArticleSchema
)
