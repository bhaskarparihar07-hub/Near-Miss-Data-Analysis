import { GoogleGenerativeAI } from '@google/generative-ai';
import { getOverviewStats } from '../utils/aggregations.js';

let genAI = null;
let model = null;

/**
 * Initialize Gemini AI with API key
 */
export function initializeGemini(apiKey) {
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.warn('⚠️  Gemini API key not configured. AI features will be disabled.');
        return false;
    }

    try {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        console.log('✅ Gemini AI initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize Gemini:', error.message);
        return false;
    }
}

/**
 * Check if Gemini is available
 */
export function isGeminiAvailable() {
    return model !== null;
}

/**
 * Query Gemini with incident data context
 */
export async function queryGemini(userQuestion, incidentData) {
    if (!isGeminiAvailable()) {
        throw new Error('Gemini AI is not configured. Please set GEMINI_API_KEY in .env file.');
    }

    try {
        // Prepare data context
        const stats = getOverviewStats(incidentData);
        const dataContext = `
You are analyzing construction site near-miss incident data. Here's the summary:

Dataset Overview:
- Total Incidents: ${stats.totalIncidents}
- Average Severity: ${stats.avgSeverity} (scale 0-4)
- Life-Changing Violations: ${stats.lcvIncidents} (${stats.lcvPercentage}%)
- Projects Covered: ${stats.uniqueProjects}
- Locations: ${stats.uniqueLocations}
- Most Common Category: ${stats.topCategory} (${stats.topCategoryCount} incidents)

The data includes fields like:
- severity_level (0-4): Risk level of the incident
- primary_category: Type of incident (Dropped Objects, Energy Isolation, Work at Height, etc.)
- action_cause: Root cause (Slip/Trip, Dropped Object, etc.)
- region: Geographic location
- unsafe_condition_or_behavior: Whether it was a behavior or condition issue
- month, week, year: Temporal data
- is_lcv: Life-changing violation flag

User Question: ${userQuestion}

Provide a clear, data-driven answer based on this context. If you need specific data that's not in the summary, mention what additional analysis would be helpful.
`;

        const result = await model.generateContent(dataContext);
        const response = await result.response;
        return response.text();

    } catch (error) {
        console.error('Gemini query error:', error);
        throw new Error('Failed to get AI response: ' + error.message);
    }
}

/**
 * Generate automated insights from incident data
 */
export async function generateInsights(incidentData, trends, categories) {
    if (!isGeminiAvailable()) {
        // Return fallback insights if AI is not available
        return generateFallbackInsights(incidentData, trends, categories);
    }

    try {
        const stats = getOverviewStats(incidentData);

        const prompt = `
Analyze this construction safety data and provide 3-5 key actionable insights:

Overall Statistics:
- Total Incidents: ${stats.totalIncidents}
- Average Severity: ${stats.avgSeverity}/4
- Life-Changing Violations: ${stats.lcvPercentage}%
- Top Category: ${stats.topCategory}

Top 5 Categories:
${categories.slice(0, 5).map((c, i) => `${i + 1}. ${c.category}: ${c.count} incidents`).join('\n')}

Recent Trends:
${trends.slice(-3).map(t => `${t.label}: ${t.count} incidents (avg severity: ${t.avgSeverity})`).join('\n')}

Provide insights in this format:
- Use emoji indicators (⚠️ for warnings, ✅ for improvements, 📍 for location-specific, 📈 for trends)
- Be specific with numbers and percentages
- Focus on actionable recommendations
- Keep each insight to one concise sentence

Return ONLY the insights as a JSON array of strings, like:
["⚠️ Insight 1", "✅ Insight 2", "📍 Insight 3"]
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Try to parse JSON response
        try {
            const insights = JSON.parse(text);
            return Array.isArray(insights) ? insights : [text];
        } catch {
            // If not valid JSON, split by newlines and clean up
            return text
                .split('\n')
                .filter(line => line.trim() && (line.includes('⚠️') || line.includes('✅') || line.includes('📍') || line.includes('📈')))
                .map(line => line.trim().replace(/^[-*]\s*/, ''))
                .slice(0, 5);
        }

    } catch (error) {
        console.error('Insight generation error:', error);
        return generateFallbackInsights(incidentData, trends, categories);
    }
}

/**
 * Generate fallback insights without AI
 */
function generateFallbackInsights(incidentData, trends, categories) {
    const stats = getOverviewStats(incidentData);
    const insights = [];

    // Top category insight
    if (categories.length > 0) {
        const topCat = categories[0];
        const percentage = ((topCat.count / stats.totalIncidents) * 100).toFixed(1);
        insights.push(`⚠️ ${topCat.category} accounts for ${percentage}% of all incidents - prioritize safety measures in this area`);
    }

    // LCV insight
    if (parseFloat(stats.lcvPercentage) > 10) {
        insights.push(`⚠️ ${stats.lcvPercentage}% of incidents are life-changing violations - immediate intervention required`);
    } else {
        insights.push(`✅ Life-changing violations are at ${stats.lcvPercentage}% - below critical threshold`);
    }

    // Severity insight
    if (parseFloat(stats.avgSeverity) > 2.5) {
        insights.push(`⚠️ Average severity is ${stats.avgSeverity}/4 - incidents are trending toward higher risk levels`);
    } else {
        insights.push(`✅ Average severity is ${stats.avgSeverity}/4 - risk levels are manageable`);
    }

    // Trend insight
    if (trends.length >= 2) {
        const recent = trends[trends.length - 1];
        const previous = trends[trends.length - 2];
        const change = ((recent.count - previous.count) / previous.count * 100).toFixed(1);

        if (change > 10) {
            insights.push(`📈 Incidents increased ${change}% in ${recent.label} compared to ${previous.label}`);
        } else if (change < -10) {
            insights.push(`✅ Incidents decreased ${Math.abs(change)}% in ${recent.label} - safety measures are working`);
        }
    }

    return insights;
}
