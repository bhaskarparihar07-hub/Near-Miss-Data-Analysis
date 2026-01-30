import express from 'express';
import NodeCache from 'node-cache';
import { getStatistics, getFilterOptions } from '../services/dataService.js';

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 }); // 10 minute cache

/**
 * GET /api/stats/overview
 * Get overview statistics
 */
router.get('/overview', (req, res) => {
    try {
        const cacheKey = `overview_${JSON.stringify(req.query)}`;
        const cached = cache.get(cacheKey);

        if (cached) {
            return res.json({
                success: true,
                data: cached,
                cached: true
            });
        }

        const stats = getStatistics(req.query);
        cache.set(cacheKey, stats.overview);

        res.json({
            success: true,
            data: stats.overview,
            cached: false
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/all
 * Get all statistics at once
 */
router.get('/all', (req, res) => {
    try {
        const cacheKey = `all_stats_${JSON.stringify(req.query)}`;
        const cached = cache.get(cacheKey);

        if (cached) {
            return res.json({
                success: true,
                data: cached,
                cached: true
            });
        }

        const stats = getStatistics(req.query);
        cache.set(cacheKey, stats);

        res.json({
            success: true,
            data: stats,
            cached: false
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/severity
 * Get severity distribution
 */
router.get('/severity', (req, res) => {
    try {
        const stats = getStatistics(req.query);
        res.json({
            success: true,
            data: stats.severity
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/trends
 * Get monthly trends
 */
router.get('/trends', (req, res) => {
    try {
        const stats = getStatistics(req.query);
        res.json({
            success: true,
            data: stats.trends
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/categories
 * Get category breakdown
 */
router.get('/categories', (req, res) => {
    try {
        const stats = getStatistics(req.query);
        res.json({
            success: true,
            data: stats.categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/regions
 * Get regional distribution
 */
router.get('/regions', (req, res) => {
    try {
        const stats = getStatistics(req.query);
        res.json({
            success: true,
            data: stats.regions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats/filters
 * Get available filter options
 */
router.get('/filters', (req, res) => {
    try {
        const cached = cache.get('filter_options');

        if (cached) {
            return res.json({
                success: true,
                data: cached,
                cached: true
            });
        }

        const options = getFilterOptions();
        cache.set('filter_options', options);

        res.json({
            success: true,
            data: options,
            cached: false
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
