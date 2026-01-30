/**
 * Statistical aggregation functions for incident data analysis
 */

/**
 * Count occurrences by a specific field
 */
export function countByField(data, fieldName) {
    const counts = {};

    data.forEach(item => {
        const value = item[fieldName] || 'Unknown';
        counts[value] = (counts[value] || 0) + 1;
    });

    return counts;
}

/**
 * Get severity level distribution
 */
export function getSeverityDistribution(data) {
    const distribution = countByField(data, 'severity_level');

    return Object.entries(distribution)
        .map(([level, count]) => ({
            level: parseInt(level),
            count,
            label: getSeverityLabel(parseInt(level))
        }))
        .sort((a, b) => a.level - b.level);
}

/**
 * Get human-readable severity labels
 */
function getSeverityLabel(level) {
    const labels = {
        0: 'Minimal',
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Critical'
    };
    return labels[level] || 'Unknown';
}

/**
 * Get monthly trend data
 */
export function getMonthlyTrends(data) {
    const monthlyData = {};

    data.forEach(item => {
        const key = `${item.year}-${String(item.month).padStart(2, '0')}`;
        if (!monthlyData[key]) {
            monthlyData[key] = {
                year: item.year,
                month: item.month,
                count: 0,
                severitySum: 0
            };
        }
        monthlyData[key].count++;
        monthlyData[key].severitySum += item.severity_level || 0;
    });

    return Object.values(monthlyData)
        .map(item => ({
            ...item,
            avgSeverity: item.count > 0 ? (item.severitySum / item.count).toFixed(2) : 0,
            label: getMonthLabel(item.month, item.year)
        }))
        .sort((a, b) => {
            if (a.year !== b.year) return a.year - b.year;
            return a.month - b.month;
        });
}

/**
 * Get month label
 */
function getMonthLabel(month, year) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month - 1]} ${year}`;
}

/**
 * Get top N categories
 */
export function getTopCategories(data, limit = 10) {
    const counts = countByField(data, 'primary_category');

    return Object.entries(counts)
        .filter(([category]) => category && category !== 'Unknown' && category !== '')
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
}

/**
 * Get regional distribution
 */
export function getRegionalDistribution(data) {
    const counts = countByField(data, 'region');

    return Object.entries(counts)
        .map(([region, count]) => ({ region, count }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get behavior vs condition breakdown
 */
export function getBehaviorConditionBreakdown(data) {
    const breakdown = {};

    data.forEach(item => {
        const type = item.unsafe_condition_or_behavior || 'Unknown';
        const month = `${item.year}-${String(item.month).padStart(2, '0')}`;

        if (!breakdown[month]) {
            breakdown[month] = {
                month,
                Behavior: 0,
                'Unsafe Condition': 0,
                Unknown: 0
            };
        }

        breakdown[month][type] = (breakdown[month][type] || 0) + 1;
    });

    return Object.values(breakdown).sort((a, b) => a.month.localeCompare(b.month));
}

/**
 * Get weekly heatmap data
 */
export function getWeeklyHeatmap(data) {
    const heatmap = {};

    data.forEach(item => {
        const week = item.week;
        if (!heatmap[week]) {
            heatmap[week] = 0;
        }
        heatmap[week]++;
    });

    return Object.entries(heatmap)
        .map(([week, count]) => ({ week: parseInt(week), count }))
        .sort((a, b) => a.week - b.week);
}

/**
 * Get action cause breakdown
 */
export function getActionCauseBreakdown(data) {
    const counts = countByField(data, 'action_cause');

    return Object.entries(counts)
        .filter(([cause]) => cause && cause !== 'Unknown' && cause !== '')
        .map(([cause, count]) => ({ cause, count }))
        .sort((a, b) => b.count - a.count);
}

/**
 * Get overview statistics
 */
export function getOverviewStats(data) {
    const totalIncidents = data.length;
    const avgSeverity = data.reduce((sum, item) => sum + (item.severity_level || 0), 0) / totalIncidents;

    const lcvIncidents = data.filter(item => item.is_lcv === true).length;
    const uniqueProjects = new Set(data.map(item => item.job)).size;
    const uniqueLocations = new Set(data.map(item => item.location)).size;

    // Get most common category
    const categories = countByField(data, 'primary_category');
    const topCategory = Object.entries(categories)
        .filter(([cat]) => cat && cat !== '')
        .sort((a, b) => b[1] - a[1])[0];

    return {
        totalIncidents,
        avgSeverity: avgSeverity.toFixed(2),
        lcvIncidents,
        lcvPercentage: ((lcvIncidents / totalIncidents) * 100).toFixed(1),
        uniqueProjects,
        uniqueLocations,
        topCategory: topCategory ? topCategory[0] : 'N/A',
        topCategoryCount: topCategory ? topCategory[1] : 0
    };
}
