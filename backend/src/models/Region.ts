import mongoose, { Schema, Document } from 'mongoose'

export interface IRegion extends Document {
  name: string
  code: string
  coordinates: {
    lat: number
    lng: number
  }
  status: 'stable' | 'tense' | 'conflict' | 'crisis'
  threatLevel: number
  incidents: string[]
  news: string[]
  lastUpdated: Date
  metadata: {
    population?: number
    gdp?: number
    militaryStrength?: string
  }
}

const RegionSchema = new Schema<IRegion>(
  {
    name: { type: String, required: true, unique: true, index: true },
    code: { type: String, required: true, unique: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ['stable', 'tense', 'conflict', 'crisis'],
      default: 'stable',
    },
    threatLevel: { type: Number, default: 0, min: 0, max: 100 },
    incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }],
    news: [{ type: Schema.Types.ObjectId, ref: 'NewsArticle' }],
    lastUpdated: { type: Date, default: Date.now },
    metadata: {
      population: Number,
      gdp: Number,
      militaryStrength: String,
    },
  },
  { timestamps: true }
)

export const Region = mongoose.model<IRegion>('Region', RegionSchema)
