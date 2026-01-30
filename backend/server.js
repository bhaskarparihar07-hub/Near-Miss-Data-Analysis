import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { initializeGemini } from './services/geminiService.js';
import { loadIncidents } from './utils/dataLoader.js';

// Import routes
import incidentsRouter from './routes/incidents.js';
import statsRouter from './routes/stats.js';
import aiRouter from './routes/ai.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.use('/api/incidents', incidentsRouter);
app.use('/api/stats', statsRouter);
app.use('/api/ai', aiRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Near Miss Dashboard API',
        version: '1.0.0',
        endpoints: {
            incidents: '/api/incidents',
            statistics: '/api/stats',
            ai: '/api/ai',
            health: '/health'
        },
        documentation: 'See README.md for API documentation'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Initialize server
async function startServer() {
    try {
        // Load incident data
        console.log('📊 Loading incident data...');
        const incidents = loadIncidents();
        console.log(`✅ Loaded ${incidents.length} incidents`);

        // Initialize Gemini AI
        console.log('🤖 Initializing Gemini AI...');
        const geminiInitialized = initializeGemini(process.env.GEMINI_API_KEY);

        if (!geminiInitialized) {
            console.log('⚠️  AI features will be disabled');
            console.log('💡 To enable AI: Get API key from https://makersuite.google.com/app/apikey');
            console.log('💡 Then set GEMINI_API_KEY in .env file');
        }

        // Start listening
        app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ========================================');
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log('🚀 ========================================');
            console.log('');
            console.log('📍 Available endpoints:');
            console.log(`   - GET  http://localhost:${PORT}/`);
            console.log(`   - GET  http://localhost:${PORT}/health`);
            console.log(`   - GET  http://localhost:${PORT}/api/incidents`);
            console.log(`   - GET  http://localhost:${PORT}/api/stats/all`);
            console.log(`   - POST http://localhost:${PORT}/api/ai/query`);
            console.log(`   - GET  http://localhost:${PORT}/api/ai/insights`);
            console.log('');
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT received, shutting down gracefully...');
    process.exit(0);
});
