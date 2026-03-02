# WarMonitor - AI-Powered Geopolitical Intelligence Dashboard

An advanced real-time global geopolitical intelligence monitoring and news aggregation platform with AI-powered threat analysis.

## Project Overview

WarMonitor is a comprehensive intelligence dashboard designed to monitor geopolitical events, aggregate global news, and provide AI-driven threat analysis. It enables real-time monitoring of international incidents, diplomatic crises, and security threats across the globe.

### Key Features

- **Real-Time Map Visualization**: Interactive global map showing incidents by severity and location
- **News Aggregation**: Automatic collection and aggregation of geopolitical news from multiple sources
- **AI-Powered Analysis**: Sentiment analysis, threat level assessment, and geopolitical implications
- **Live Updates**: WebSocket-based real-time notifications for new incidents and articles
- **Regional Monitoring**: Track threat levels and incidents by geographic region
- **Threat Assessment**: Automated analysis of crisis severity and implications
- **Multi-Source Integration**: Aggregates data from multiple news APIs and incident databases

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

### Key Components

```
WarMonitor/
├── frontend/              # React/Next.js application
│   ├── app/              # Application pages
│   ├── components/       # React components
│   ├── lib/              # Utility libraries
│   ├── store/            # State management
│   └── hooks/            # Custom hooks
├── backend/              # Node.js/Express server
│   ├── src/
│   │   ├── models/       # Mongoose schemas
│   │   ├── services/     # Business logic
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Request handlers
│   │   └── middleware/   # Express middleware
├── shared/               # Shared TypeScript types
└── README.md            # Project documentation
```

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

## API Endpoints

### Incidents
- `GET /api/incidents` - Get all incidents
- `POST /api/incidents` - Create new incident
- `GET /api/incidents/:id` - Get incident details
- `POST /api/incidents/:id/analyze` - Analyze incident with AI

### News
- `GET /api/news/latest` - Get latest articles
- `GET /api/news/region/:region` - Get articles by region
- `GET /api/news/search` - Search articles
- `POST /api/news/aggregate` - Trigger news aggregation

### Regions
- `GET /api/regions` - Get all regions
- `GET /api/regions/:regionId/status` - Get region status
- `GET /api/regions/:regionId/threat-level` - Get threat level

### AI Analysis
- `POST /api/ai/sentiment` - Analyze text sentiment
- `POST /api/ai/threat-analysis` - Generate threat analysis
- `GET /api/ai/summary` - Get geopolitical summary

## WebSocket Events

### Subscriptions
- `subscribe-region` - Subscribe to region updates
- `unsubscribe-region` - Unsubscribe from region

### Broadcasts
- `new-incident` - New incident detected
- `new-article` - New article aggregated
- `region-update` - Region status update
- `analysis-complete` - AI analysis complete

## Configuration

### Environment Variables

Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

Backend (.env):
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/warmonitor
NEWS_API_KEY=your_key
OPENAI_API_KEY=your_key
```

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
