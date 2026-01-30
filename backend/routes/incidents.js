import express from 'express';
import { getIncidentsPaginated, getIncidentById } from '../utils/dataLoader.js';
import { getAllIncidents } from '../services/dataService.js';

const router = express.Router();

/**
 * GET /api/incidents
 * Get all incidents with pagination and filters
 */
router.get('/', (req, res) => {
    try {
        const { page = 1, limit = 100, ...filters } = req.query;

        // If filters are provided, use filtered data
        if (Object.keys(filters).length > 0) {
            const filteredData = getAllIncidents(filters);
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + parseInt(limit);

            return res.json({
                success: true,
                data: filteredData.slice(startIndex, endIndex),
                pagination: {
                    total: filteredData.length,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(filteredData.length / limit)
                }
            });
        }

        // Otherwise use paginated data
        const result = getIncidentsPaginated(parseInt(page), parseInt(limit));
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/incidents/:id
 * Get a single incident by ID
 */
router.get('/:id', (req, res) => {
    try {
        const incident = getIncidentById(req.params.id);

        if (!incident) {
            return res.status(404).json({
                success: false,
                error: 'Incident not found'
            });
        }

        res.json({
            success: true,
            data: incident
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

export default router;
