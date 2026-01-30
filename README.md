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

### Why These Technologies?

**Next.js 14:**
- ✅ Server-side rendering for better performance
- ✅ Built-in optimization and code splitting
- ✅ Easy deployment to Vercel
- ✅ TypeScript support out of the box

**Node.js + Express:**
- ✅ JavaScript ecosystem consistency
- ✅ Fast JSON processing
- ✅ Easy integration with Next.js
- ✅ Great for REST APIs

**Google Gemini API:**
- ✅ **Free tier available** (perfect for this project)
- ✅ Excellent for data analysis and Q&A
- ✅ Fast response times
- ✅ Good context window for dataset analysis

## 🏛️ Architecture Design

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend - Next.js                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Dashboard   │  │    Chart     │  │   AI Chat    │     │
│  │      UI      │──│  Components  │  │  Interface   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                                      │            │
│         └──────────────────┬──────────────────┘            │
└────────────────────────────┼──────────────────────────────┘
                             │ HTTP/REST
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  Backend - Node.js API                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Express Server                          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │  Incidents │  │ Statistics │  │     AI     │    │  │
│  │  │   Routes   │  │   Routes   │  │   Routes   │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                    │                  │           │
│         ▼                    ▼                  ▼           │
│  ┌─────────────┐      ┌─────────────┐   ┌─────────────┐   │
│  │    Data     │      │ Aggregation │   │   Gemini    │   │
│  │   Loader    │      │  Functions  │   │   Service   │   │
│  └─────────────┘      └─────────────┘   └─────────────┘   │
│         │                                       │           │
└─────────┼───────────────────────────────────────┼──────────┘
          │                                       │
          ▼                                       ▼
   ┌─────────────┐                      ┌─────────────────┐
   │  JSON File  │                      │  Google Gemini  │
   │ 7,836 rows  │                      │      API        │
   └─────────────┘                      └─────────────────┘
```

### API Endpoints

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| `/api/incidents` | GET | Fetch all incidents (paginated) | Array of incidents |
| `/api/incidents/:id` | GET | Get single incident details | Single incident object |
| `/api/stats/all` | GET | Get all statistics at once | Complete stats object |
| `/api/stats/overview` | GET | Dashboard summary statistics | Aggregated counts |
| `/api/stats/severity` | GET | Severity distribution | Chart data |
| `/api/stats/categories` | GET | Category breakdown | Chart data |
| `/api/stats/trends` | GET | Time-based trends | Time series data |
| `/api/stats/regions` | GET | Regional distribution | Geographic data |
| `/api/stats/filters` | GET | Available filter options | Filter metadata |
| `/api/ai/query` | POST | AI-powered Q&A | Natural language response |
| `/api/ai/insights` | GET | Auto-generated insights | AI analysis array |
| `/api/ai/status` | GET | Check AI availability | Service status |
| `/health` | GET | Server health check | Health status |

### Data Flow

1. **User Request** → Frontend makes API call
2. **API Route** → Express routes to appropriate handler
3. **Data Service** → Processes request, checks cache
4. **Aggregation** → Calculates statistics if needed
5. **Response** → Returns JSON data to frontend
6. **Rendering** → Charts visualize the data

### Performance Optimizations

**Backend:**
- ✅ In-memory caching (10-minute TTL)
- ✅ Lazy loading (JSON loaded once on startup)
- ✅ Pagination (100 records per page)
- ✅ Gzip compression

**Frontend:**
- ✅ Code splitting (lazy load charts)
- ✅ Client-side caching
- ✅ Debounced filter changes
- ✅ Optimized re-renders

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

### Dataset Overview
- **Total Records**: 7,836 incidents
- **File Size**: ~5.6 MB JSON
- **Time Range**: 2024 (full year coverage)
- **Format**: MongoDB export with nested objects

### Key Data Fields

| Field | Type | Purpose | Sample Values |
|-------|------|---------|---------------|
| `incident_number` | String | Unique identifier | "135774577" |
| `incident_date` | Timestamp | When incident occurred | 1706868529000 |
| `severity_level` | Integer | Risk severity (0-4) | 0, 1, 2, 3, 4 |
| `primary_category` | String | Incident type | "Dropped Objects", "Energy Isolation" |
| `action_cause` | String | Root cause | "Dropped Object(s)", "Slip/Trip" |
| `region` | String | Geographic location | "Asia (North Asia)" |
| `job` | String | Project name | "Project A", "Project E" |
| `location` | String | Specific site area | "Area 42", "Tank 107" |
| `unsafe_condition_or_behavior` | String | Classification | "Unsafe Condition", "Behavior" |
| `behavior_type` | String | Risk behavior | "At-Risk" |
| `company_type` | String | Company classification | "B", "N" |
| `craft_code` | String | Worker role | "Laborers", "Welder" |
| `is_lcv` | Boolean | Life-changing violation | true/false |
| `month`, `week`, `year` | Integer | Time dimensions | Pre-calculated |

### Data Quality
- ✅ All records have timestamps and identifiers
- ⚠️ Some fields have empty strings - handled gracefully
- ✅ Time dimensions pre-calculated for analysis
- ✅ Severity levels standardized (0-4 scale)

### Example Record
```json
{
  "id": "135774577",
  "incident_number": "135774577",
  "incident_date": 1706868529000,
  "severity_level": 2,
  "primary_category": "Energy Isolation",
  "action_cause": "Other",
  "region": "Asia (North Asia)",
  "job": "Project A",
  "location": "Area 42",
  "unsafe_condition_or_behavior": "Unsafe Condition",
  "behavior_type": "At-Risk",
  "company_type": "B",
  "is_lcv": true,
  "month": 2,
  "week": 5,
  "year": 2024
}
```

## 📈 Visualization Strategy

### Chart 1: Severity Level Distribution (Pie Chart)
- **Purpose**: Show proportion of incidents by severity (0-4)
- **Data Source**: Aggregate count by `severity_level`
- **Library**: Recharts PieChart
- **Insight**: Identify most common risk levels
- **Colors**: Green (minimal) → Red (critical)

### Chart 2: Monthly Incident Trends (Line Chart)
- **Purpose**: Track incidents over time
- **Data Source**: Count by `month` and `year`
- **Library**: Recharts LineChart
- **Insight**: Identify seasonal patterns or improvements
- **Dual Axis**: Incident count + Average severity

### Chart 3: Top Incident Categories (Horizontal Bar Chart)
- **Purpose**: Show most common incident types
- **Data Source**: Count by `primary_category`
- **Library**: Recharts BarChart
- **Insight**: Focus safety efforts on top categories
- **Display**: Top 10 categories

### Chart 4: Regional Distribution (Bar Chart)
- **Purpose**: Compare incidents across regions
- **Data Source**: Count by `region`
- **Library**: Recharts BarChart
- **Insight**: Identify high-risk locations

### Chart 5: Behavior vs Condition (Stacked Bar Chart)
- **Purpose**: Compare unsafe behaviors vs conditions
- **Data Source**: Count by `unsafe_condition_or_behavior` over time
- **Library**: Recharts BarChart (stacked)
- **Insight**: Understand root causes

### Chart 6: Weekly Heatmap (Bar Chart)
- **Purpose**: Visualize incident density by week
- **Data Source**: Count by `week` (1-52)
- **Library**: Recharts BarChart with color intensity
- **Insight**: Identify high-risk periods

### Chart 7: Action Cause Breakdown (Treemap)
- **Purpose**: Hierarchical view of causes
- **Data Source**: Count by `action_cause`
- **Library**: Recharts Treemap
- **Insight**: Drill down into specific causes

## 🤖 AI Integration with Gemini

### Use Cases

#### 1. Natural Language Q&A
Users can ask questions in plain English:
- "What were the most common incidents in March 2024?"
- "Which region has the highest severity incidents?"
- "Show me trends for dropped objects"
- "What safety recommendations do you have?"

**How it works:**
1. User submits question via chat interface
2. Backend receives question + dataset context
3. Gemini analyzes data and generates answer
4. Response displayed in chat

**Implementation:**
```javascript
// Backend: /api/ai/query
const response = await geminiAPI.generateContent({
  prompt: `Given this near-miss incident data summary: ${dataContext}
           User question: ${userQuery}
           Provide a clear, data-driven answer.`,
  context: aggregatedStats
});
```

#### 2. Automated Insights Generation
AI generates 3-5 key insights on dashboard load:
- ⚠️ Risk alerts: "Dropped Objects increased 23% in Q2"
- ✅ Positive trends: "Severity Level 4 decreased 15%"
- 📍 Location-specific: "Asia region needs attention - 45% of incidents"
- 📈 Trend observations: "Weekly incidents peaked in Week 25"

**Implementation:**
```javascript
// Backend: /api/ai/insights
const insights = await geminiAPI.generateContent({
  prompt: `Analyze this construction safety data and provide 3-5 key insights:
           ${JSON.stringify(statistics)}
           Focus on trends, risks, and actionable recommendations.`
});
```

#### 3. Fallback Mechanism
If Gemini API is not configured:
- Dashboard works fully with all charts
- Rule-based insights generated
- Helpful setup instructions shown
- No degradation of core functionality

### Getting Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Click "Create API Key"
4. Copy key to `backend/.env`:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

**Note**: Free tier includes generous quota for this project.

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


## 👨‍💻 Author

Built with ❤️ using Next.js, Node.js, and Google Gemini AI

## 🙏 Acknowledgments

- Dataset provided for construction safety analysis
- Google Gemini API for AI-powered insights
- Recharts for beautiful data visualizations
- Next.js team for excellent framework

---

**Need Help?** Check the [Implementation Plan](./IMPLEMENTATION_PLAN.md) for detailed technical documentation.
