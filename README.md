# Near Miss Data Analysis Dashboard

> Interactive dashboard for analyzing construction site near-miss incident data with AI-powered insights

![Dashboard Preview](https://img.shields.io/badge/Status-Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![AI](https://img.shields.io/badge/AI-Gemini-blue)

## 📊 Overview

A comprehensive web application for visualizing and analyzing **7,836 near-miss incident records** from construction sites. The dashboard provides interactive charts, statistical analysis, and AI-powered question answering to help identify safety trends and improve workplace safety measures.

### What is a Near Miss?

A near miss in construction refers to an unplanned event that could have resulted in an accident, injury, or damage, but did not, either by chance or timely intervention. Examples include:
- A worker slips on a wet surface but regains balance without falling
- A tool falls from a height but misses people below
- A vehicle stops just in time to avoid a collision

## ✨ Features

### 📈 Data Visualization (7 Charts)
1. **Severity Distribution** - Pie chart showing risk levels (0-4 scale)
2. **Monthly Trends** - Line chart tracking incidents over time
3. **Top Categories** - Horizontal bar chart of incident types
4. **Regional Distribution** - Geographic comparison of incidents
5. **Behavior vs Condition** - Stacked bar chart of root causes
6. **Weekly Heatmap** - Calendar view of incident density
7. **Action Cause Breakdown** - Treemap of hierarchical causes

### 🤖 AI-Powered Features
- **Natural Language Q&A**: Ask questions about the data in plain English
- **Automated Insights**: AI-generated safety recommendations
- **Trend Analysis**: Intelligent pattern detection

### 🎯 Key Capabilities
- ✅ Handles 7,836 records without performance issues
- ✅ Graceful handling of missing/empty data
- ✅ Responsive design for mobile and desktop
- ✅ Real-time data filtering and aggregation
- ✅ In-memory caching for fast performance
- ✅ Dark mode support

## 🏗️ Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Charts**: Recharts
- **Data Fetching**: SWR
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express
- **AI**: Google Gemini API
- **Caching**: node-cache
- **Data Format**: JSON (7,836 records)

## 📁 Project Structure

```
Project2/
├── backend/
│   ├── server.js                 # Express server
│   ├── routes/
│   │   ├── incidents.js          # Incident endpoints
│   │   ├── stats.js              # Statistics endpoints
│   │   └── ai.js                 # AI endpoints
│   ├── services/
│   │   ├── dataService.js        # Business logic
│   │   └── geminiService.js      # AI integration
│   ├── utils/
│   │   ├── dataLoader.js         # JSON loader
│   │   └── aggregations.js       # Statistical functions
│   ├── data/
│   │   └── db.dashboard_incidents.json
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── charts/               # 7 chart components
│   │   ├── ui/                   # Reusable UI components
│   │   └── AIChat.tsx            # AI chat interface
│   ├── lib/
│   │   ├── api.ts                # API client
│   │   └── utils.ts              # Utility functions
│   └── package.json
│
├── IMPLEMENTATION_PLAN.md        # Technical architecture
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Gemini API Key** (optional, for AI features)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd Project2
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure Environment Variables**

Backend (.env):
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

Frontend (.env.local):
```bash
cd ../frontend
cp .env.example .env.local
```

Edit `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and paste it in `backend/.env`

**Note**: AI features will work with fallback insights if no API key is provided.

## 🎮 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Dashboard will open on http://localhost:3000

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## 📡 API Endpoints

### Incidents
- `GET /api/incidents` - Get all incidents (paginated)
- `GET /api/incidents/:id` - Get single incident

### Statistics
- `GET /api/stats/all` - Get all statistics
- `GET /api/stats/overview` - Get overview stats
- `GET /api/stats/severity` - Get severity distribution
- `GET /api/stats/trends` - Get monthly trends
- `GET /api/stats/categories` - Get category breakdown
- `GET /api/stats/regions` - Get regional distribution
- `GET /api/stats/filters` - Get available filter options

### AI
- `POST /api/ai/query` - Ask questions (requires Gemini API key)
- `GET /api/ai/insights` - Get automated insights
- `GET /api/ai/status` - Check AI service status

### Health
- `GET /health` - Server health check

## 🎨 Features Walkthrough

### Dashboard Overview
The main dashboard displays:
- **4 Key Metrics**: Total incidents, average severity, LCV count, active projects
- **AI Insights**: Automated safety recommendations
- **7 Interactive Charts**: Comprehensive data visualization
- **AI Chat**: Ask questions about the data

### Example AI Questions
- "What were the most common incidents in 2024?"
- "Which region has the highest severity incidents?"
- "Show me trends for dropped objects"
- "What safety recommendations do you have?"

### Data Filtering
All charts support filtering by:
- Year
- Month
- Region
- Severity Level
- Category
- Project

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard loads without errors
- [ ] All 7 charts render correctly
- [ ] Stats cards display accurate numbers
- [ ] AI chat responds to questions (if API key configured)
- [ ] Responsive design works on mobile
- [ ] Dark mode toggles properly
- [ ] No crashes with full dataset (7,836 records)
- [ ] Missing data handled gracefully

### Performance
- **Load Time**: < 3 seconds for initial dashboard load
- **Chart Rendering**: < 500ms per chart
- **API Response**: < 200ms for cached data
- **Memory Usage**: Stable with full dataset

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process if needed
kill -9 <PID>
```

### Frontend can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Ensure CORS is enabled in backend

### AI features not working
- Verify `GEMINI_API_KEY` is set in backend/.env
- Check API key is valid at [Google AI Studio](https://makersuite.google.com/app/apikey)
- Dashboard will work with fallback insights if AI is unavailable

### Charts not rendering
- Clear browser cache
- Check browser console for errors
- Verify data is loading from API

## 📊 Data Schema

Each incident record contains:
```typescript
{
  id: string;
  incident_number: string;
  incident_date: number;           // Unix timestamp
  severity_level: number;          // 0-4
  primary_category: string;        // e.g., "Dropped Objects"
  action_cause: string;            // Root cause
  region: string;                  // Geographic location
  job: string;                     // Project name
  location: string;                // Specific site area
  unsafe_condition_or_behavior: string;
  behavior_type: string;
  company_type: string;
  craft_code: string;              // Worker role
  is_lcv: boolean;                 // Life-changing violation
  month: number;                   // 1-12
  week: number;                    // 1-52
  year: number;
  // ... additional fields
}
```

## 🚢 Deployment

### Vercel (Recommended)

**Frontend:**
```bash
cd frontend
vercel
```

**Backend:**
Deploy as Vercel Serverless Functions or use Railway/Render for always-on server.

### Docker

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📝 Assumptions & Limitations

### Assumptions
- Data is pre-aggregated with time dimensions (month, week, year)
- All timestamps are in Unix format (milliseconds)
- Severity levels range from 0 (minimal) to 4 (critical)
- Empty strings represent missing data

### Limitations
- AI features require internet connection and API key
- Large datasets (>10k records) may need pagination
- Real-time updates not implemented (static dataset)
- No user authentication/authorization

## 🤝 Contributing

This project was created for an assignment. For improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Author

Built with ❤️ using Next.js, Node.js, and Google Gemini AI

## 🙏 Acknowledgments

- Dataset provided for construction safety analysis
- Google Gemini API for AI-powered insights
- Recharts for beautiful data visualizations
- Next.js team for excellent framework

---

**Need Help?** Check the [Implementation Plan](./IMPLEMENTATION_PLAN.md) for detailed technical documentation.
