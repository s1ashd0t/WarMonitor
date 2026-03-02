interface AIAnalysisResult {
  sentiment: string
  threat_level: number
  implications: string
  keywords: string[]
}

export class AIAnalysisService {
  async analyzeSentiment(text: string): Promise<string> {
    // TODO: Integrate with OpenAI or HuggingFace
    // Placeholder implementation
    const negativeWords = [
      'crisis',
      'war',
      'conflict',
      'attack',
      'threat',
      'danger',
    ]
    const positiveWords = ['peace', 'agreement', 'resolution', 'cooperation']

    const lowerText = text.toLowerCase()
    const negativeCount = negativeWords.filter((w) =>
      lowerText.includes(w)
    ).length
    const positiveCount = positiveWords.filter((w) =>
      lowerText.includes(w)
    ).length

    if (negativeCount > positiveCount) return 'negative'
    if (positiveCount > negativeCount) return 'positive'
    return 'neutral'
  }

  async analyzeIncident(title: string, description: string): Promise<AIAnalysisResult> {
    const sentiment = await this.analyzeSentiment(`${title} ${description}`)
    const threatLevel = this.calculateThreatLevel(`${title} ${description}`)
    const implications = this.generateImplications(
      `${title} ${description}`,
      threatLevel
    )
    const keywords = this.extractKeywords(`${title} ${description}`)

    return {
      sentiment,
      threat_level: threatLevel,
      implications,
      keywords,
    }
  }

  private calculateThreatLevel(text: string): number {
    const criticalTerms = [
      'nuclear',
      'attack',
      'war',
      'invasion',
      'military strike',
    ]
    const highTerms = ['crisis', 'conflict', 'armed', 'siege']
    const mediumTerms = ['tension', 'protest', 'disputed']

    const lowerText = text.toLowerCase()

    if (criticalTerms.some((t) => lowerText.includes(t))) return 90
    if (highTerms.some((t) => lowerText.includes(t))) return 70
    if (mediumTerms.some((t) => lowerText.includes(t))) return 40
    return 20
  }

  private generateImplications(text: string, threatLevel: number): string {
    if (threatLevel >= 80) {
      return 'Critical threat level. Immediate diplomatic intervention recommended.'
    } else if (threatLevel >= 60) {
      return 'High threat level. Close monitoring and regional coordination needed.'
    } else if (threatLevel >= 40) {
      return 'Moderate threat level. Preventive diplomatic measures recommended.'
    } else {
      return 'Low threat level. Routine monitoring continues.'
    }
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const keywords = text
      .split(/\s+/)
      .filter(
        (word) =>
          word.length > 5 &&
          !['crisis', 'conflict', 'incident', 'situation'].includes(
            word.toLowerCase()
          )
      )
      .slice(0, 5)

    return keywords
  }

  async generateGeopoliticalSummary(incidents: any[]): Promise<string> {
    const highThreatCount = incidents.filter(
      (i) => i.severity === 'high' || i.severity === 'critical'
    ).length
    const regions = new Set(
      incidents.map((i) => i.location?.address).filter(Boolean)
    )

    return `Global Summary: ${highThreatCount} high-threat incidents across ${regions.size} regions. Recommend heightened diplomatic engagement.`
  }
}

export const aiAnalysisService = new AIAnalysisService()
