import { loadIncidents, filterIncidents } from '../utils/dataLoader.js';
import * as aggregations from '../utils/aggregations.js';

/**
 * Data service for processing and analyzing incident data
 */

/**
 * Get all available data with optional filters
 */
export function getAllIncidents(filters = {}) {
    return filterIncidents(filters);
}

/**
 * Get comprehensive statistics
 */
export function getStatistics(filters = {}) {
    const data = filterIncidents(filters);

    return {
        overview: aggregations.getOverviewStats(data),
        severity: aggregations.getSeverityDistribution(data),
        trends: aggregations.getMonthlyTrends(data),
        categories: aggregations.getTopCategories(data, 15),
        regions: aggregations.getRegionalDistribution(data),
        behaviorCondition: aggregations.getBehaviorConditionBreakdown(data),
        weeklyHeatmap: aggregations.getWeeklyHeatmap(data),
        actionCauses: aggregations.getActionCauseBreakdown(data)
    };
}

/**
 * Get available filter options
 */
export function getFilterOptions() {
    const data = loadIncidents();

    const uniqueValues = (field) => {
        return [...new Set(data.map(item => item[field]))]
            .filter(val => val && val !== '')
            .sort();
    };

    return {
        years: uniqueValues('year'),
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        regions: uniqueValues('region'),
        categories: uniqueValues('primary_category'),
        jobs: uniqueValues('job'),
        severityLevels: [0, 1, 2, 3, 4]
    };
}

/**
 * Get data summary for AI context
 */
export function getDataSummary() {
    const data = loadIncidents();
    const stats = aggregations.getOverviewStats(data);
    const topCategories = aggregations.getTopCategories(data, 5);
    const trends = aggregations.getMonthlyTrends(data);

    return {
        stats,
        topCategories,
        recentTrends: trends.slice(-3)
    };
}
