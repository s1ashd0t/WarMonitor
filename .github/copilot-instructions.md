# WarMonitor - Copilot Instructions

## Project Overview
WarMonitor is an AI-powered real-time global geopolitical intelligence dashboard with news aggregation and threat analysis capabilities.

## Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, TailwindCSS, Leaflet, Socket.io-client
- **Backend**: Node.js, Express, TypeScript, MongoDB, Socket.io
- **Infrastructure**: Docker, Docker Compose
- **Shared**: TypeScript type definitions

## Project Structure
```
WarMonitor/
├── frontend/          # Next.js React application
├── backend/           # Express.js API server
├── shared/            # Shared types and utilities
└── README.md          # Main documentation
```

## Key Features
1. Real-time map visualization of geopolitical incidents
2. Automated news aggregation from multiple sources
3. AI-powered sentiment analysis and threat assessment
4. WebSocket-based real-time updates
5. Regional monitoring and threat tracking
6. Multi-user dashboard

## Development Workflow

### Frontend Development
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend Development
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your API keys
npm run dev
# Runs on http://localhost:3001
```

### Database Setup
- MongoDB required (local or Atlas)
- Initialize with sample regions and incidents data
- See backend/.env.example for configuration

## API Architecture
- RESTful endpoints for CRUD operations
- WebSocket for real-time events
- Pagination for large datasets
- Error handling with standardized responses

## Code Standards
1. Use TypeScript for all new code
2. Follow ESLint configuration
3. Add JSDoc comments for public APIs
4. Use consistent naming conventions (camelCase for variables, PascalCase for classes)
5. Component structure: Page → Container → Component

## Frontend Conventions
- Place reusable components in /components
- Use Zustand for global state
- Custom hooks in /hooks directory
- Utility functions in /lib
- Styles with TailwindCSS (no CSS files)

## Backend Conventions
- Models in /models (Mongoose schemas)
- Business logic in /services
- API handlers in /controllers
- Route definitions in /routes
- Middleware in /middleware

## Important Files
- `/frontend/store/dashboardStore.ts` - Global state management
- `/backend/src/index.ts` - Server entry point
- `/backend/src/services/` - Core business logic
- `/shared/types.ts` - Shared TypeScript definitions

## Configuration
1. Frontend: `frontend/.env.local`
2. Backend: `backend/.env`
3. Docker: `docker-compose.yml`

## Deployment
- Docker images for both frontend and backend
- docker-compose for local multi-container setup
- MongoDB and Redis services included

## News Aggregation
- Runs every hour automatically
- Supports multiple news APIs (NewsAPI, NewsData)
- Stores articles in MongoDB
- Broadcasts new articles via WebSocket

## AI Services
- Sentiment analysis on articles and incidents
- Threat level calculation
- Geopolitical implication generation
- Keyword extraction
- Summary generation

## Common Tasks

### Adding a New API Endpoint
1. Create controller method in `/controllers`
2. Add route in `/routes`
3. Import route in `src/index.ts`

### Adding a New Frontend Component
1. Create component file in `/components`
2. Export from component index if needed
3. Use in page or other components

### Adding a Database Model
1. Create schema in `/models`
2. Export model from model file
3. Use in services and controllers

## Testing
- Endpoints can be tested with Postman/Insomnia
- Frontend components use React best practices
- No unit test framework configured yet

## Monitoring
- Winston.js logging configured
- Error logs in `backend/error.log`
- Combined logs in `backend/combined.log`

## Performance Considerations
1. MongoDB indexes on frequently queried fields
2. Pagination for list endpoints
3. Real-time updates via WebSocket instead of polling
4. Efficient news aggregation scheduling
5. CORS and helmet.js for security
