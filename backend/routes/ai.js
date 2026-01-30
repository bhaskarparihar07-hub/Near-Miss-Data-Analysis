import express from 'express';
import { queryGemini, generateInsights, isGeminiAvailable } from '../services/geminiService.js';
import { loadIncidents } from '../utils/dataLoader.js';
import { getTopCategories, getMonthlyTrends } from '../utils/aggregations.js';

const router = express.Router();

/**
 * POST /api/ai/query
 * Ask questions about the incident data
 */
router.post('/query', async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                error: 'Question is required'
            });
        }

        if (!isGeminiAvailable()) {
            return res.status(503).json({
                success: false,
                error: 'AI service is not configured. Please set GEMINI_API_KEY in environment variables.',
                hint: 'Get your API key from https://makersuite.google.com/app/apikey'
            });
        }

        const incidentData = loadIncidents();
        const answer = await queryGemini(question, incidentData);

        res.json({
            success: true,
            data: {
                question,
                answer
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/ai/insights
 * Get automated insights about the data
 */
router.get('/insights', async (req, res) => {
    try {
        const incidentData = loadIncidents();
        const trends = getMonthlyTrends(incidentData);
        const categories = getTopCategories(incidentData, 10);

        const insights = await generateInsights(incidentData, trends, categories);

        res.json({
            success: true,
            data: insights,
            aiEnabled: isGeminiAvailable()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/ai/status
 * Check if AI service is available
 */
router.get('/status', (req, res) => {
    res.json({
        success: true,
        data: {
            available: isGeminiAvailable(),
            service: 'Google Gemini Pro'
        }
    });
});

export default router;
