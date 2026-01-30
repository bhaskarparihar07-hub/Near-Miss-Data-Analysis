const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/**
 * Generic API fetch wrapper
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

/**
 * API Client
 */
export const api = {
    // Incidents
    getIncidents: (page = 1, limit = 100, filters = {}) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            ...filters,
        });
        return apiFetch(`/api/incidents?${params}`);
    },

    getIncidentById: (id: string) => {
        return apiFetch(`/api/incidents/${id}`);
    },

    // Statistics
    getAllStats: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/all?${params}`);
    },

    getOverview: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/overview?${params}`);
    },

    getSeverityDistribution: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/severity?${params}`);
    },

    getTrends: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/trends?${params}`);
    },

    getCategories: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/categories?${params}`);
    },

    getRegions: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return apiFetch(`/api/stats/regions?${params}`);
    },

    getFilterOptions: () => {
        return apiFetch('/api/stats/filters');
    },

    // AI
    queryAI: (question: string) => {
        return apiFetch('/api/ai/query', {
            method: 'POST',
            body: JSON.stringify({ question }),
        });
    },

    getInsights: () => {
        return apiFetch('/api/ai/insights');
    },

    getAIStatus: () => {
        return apiFetch('/api/ai/status');
    },

    // Health
    healthCheck: () => {
        return apiFetch('/health');
    },
};

/**
 * SWR fetcher function
 */
export const fetcher = (url: string) => fetch(url).then(res => res.json());
