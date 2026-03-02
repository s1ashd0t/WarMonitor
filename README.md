# WarMonitor - AI-Powered Geopolitical Intelligence Dashboard (vibecoded)

An advanced real-time global geopolitical intelligence monitoring and news aggregation platform with AI-powered threat analysis.

## Project Overview

WarMonitor is a comprehensive intelligence dashboard designed to monitor geopolitical events, aggregate global news, and provide AI-driven threat analysis. It enables real-time monitoring of international incidents, diplomatic crises, and security threats across the globe.

### Key Features

- Live Global Map — Incidents plotted by severity and location. See the world's chaos at a glance.
- News Aggregation — Pulls from multiple sources automatically. No tab-hopping required.
- AI Analysis — Sentiment scoring, threat assessment, geopolitical implications. Not just headlines — context.
- Real-Time Alerts — WebSocket-powered live updates. New incident? You know instantly.
- Regional Monitoring — Drill down by geography. Not every crisis is your crisis.
- Threat Scoring — Automated severity classification so you prioritize what actually matters.

## Architecture

### Frontend (Next.js + React)
- Modern React components with TypeScript
- Real-time map visualization with Leaflet
- State management with Zustand
- WebSocket integration for live updates
- Responsive dark-themed UI

### Backend (Node.js + Express)
- RESTful API with TypeScript
- MongoDB for persistent storage
- Socket.io for real-time communication
- AI-powered analysis services
- News aggregation pipeline

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- API Keys for news aggregation (NewsAPI, NewsData)
- Optional: OpenAI API key for advanced AI features

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Update API keys and MongoDB URI

npm run dev
```

Backend will run on `http://localhost:3001`

## Data Sources

The platform integrates with:
- **NewsAPI** - Global news aggregation
- **NewsData** - Additional news coverage
- **ACLED Data** - Armed Conflict Location Event Data
- **Custom incident feeds** - Direct integration

## AI Features

- **Sentiment Analysis**: Automatic sentiment classification of news and incidents
- **Threat Level Assessment**: ML-based threat severity scoring
- **Geopolitical Implications**: AI-generated analysis of geopolitical impacts
- **Keyword Extraction**: Automatic identification of key terms and entities
- **Regional Analysis**: Summary reports by region

## Performance Optimization

- MongoDB indexing on frequently queried fields
- Redis caching (optional)
- Pagination for large datasets
- Real-time updates via WebSocket
- Efficient news aggregation scheduling

## Security Features

- Helmet.js for HTTP headers
- CORS protection
- Rate limiting
- Input validation
- Error handling

## Deployment

### Docker Deployment

```bash
docker-compose up -d
```

### Environment-Specific Configuration

- **Development**: Full logging, hot reload
- **Production**: Optimized builds, external MongoDB, security headers

## Monitoring & Logging

- Winston.js for structured logging
- Error tracking and reporting
- Performance monitoring
- Real-time connection status

## Future Enhancements

- Advanced ML models for threat prediction
- Predictive analysis dashboard
- Integration with more data sources
- Custom alert system
- Export and reporting features
- Multi-language support
- Advanced filtering and search
- Historical trend analysis

## Contributing

1. Follow TypeScript best practices
2. Use meaningful commit messages
3. Test API endpoints before deployment
4. Document new features

## License

Proprietary - WarMonitor Intelligence Platform

## Support

For issues and feature requests, please contact the development team.
