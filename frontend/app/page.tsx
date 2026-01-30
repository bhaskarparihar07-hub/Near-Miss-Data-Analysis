'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import StatCard from '@/components/ui/StatCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SeverityChart from '@/components/charts/SeverityChart';
import TrendChart from '@/components/charts/TrendChart';
import CategoryChart from '@/components/charts/CategoryChart';
import RegionChart from '@/components/charts/RegionChart';
import BehaviorChart from '@/components/charts/BehaviorChart';
import WeeklyHeatmap from '@/components/charts/WeeklyHeatmap';
import ActionCauseChart from '@/components/charts/ActionCauseChart';
import AIChat from '@/components/AIChat';
import { formatNumber } from '@/lib/utils';

export default function Home() {
    const [stats, setStats] = useState<any>(null);
    const [insights, setInsights] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            setError('');

            // Load statistics
            const statsResponse: any = await api.getAllStats();
            if (statsResponse.success) {
                setStats(statsResponse.data);
            }

            // Load AI insights
            try {
                const insightsResponse: any = await api.getInsights();
                if (insightsResponse.success) {
                    setInsights(insightsResponse.data);
                }
            } catch (err) {
                console.log('AI insights not available');
            }

        } catch (err: any) {
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
                    <h2 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">Error Loading Dashboard</h2>
                    <p className="text-red-700 dark:text-red-400">{error}</p>
                    <button
                        onClick={loadData}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    const { overview, severity, trends, categories, regions, behaviorCondition, weeklyHeatmap, actionCauses } = stats;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Header */}
            <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Near Miss Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Construction Safety Analytics & Incident Tracking
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Live Data</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* AI Insights */}
                {insights.length > 0 && (
                    <div className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <span>💡</span>
                            <span>AI-Powered Insights</span>
                        </h2>
                        <div className="grid gap-2">
                            {insights.map((insight, index) => (
                                <div key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                                    <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                                    <span className="text-sm">{insight}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Incidents"
                        value={formatNumber(overview.totalIncidents)}
                        subtitle="Recorded near-miss events"
                        color="blue"
                    />
                    <StatCard
                        title="Average Severity"
                        value={overview.avgSeverity}
                        subtitle="Out of 4.0 scale"
                        color="yellow"
                    />
                    <StatCard
                        title="Life-Changing Violations"
                        value={formatNumber(overview.lcvIncidents)}
                        subtitle={`${overview.lcvPercentage}% of total`}
                        color="red"
                    />
                    <StatCard
                        title="Active Projects"
                        value={overview.uniqueProjects}
                        subtitle={`${overview.uniqueLocations} locations`}
                        color="green"
                    />
                </div>

                {/* Top Category Alert */}
                <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div>
                            <p className="font-semibold text-yellow-900 dark:text-yellow-300">
                                Top Risk Category: {overview.topCategory}
                            </p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-400">
                                {formatNumber(overview.topCategoryCount)} incidents recorded - requires immediate attention
                            </p>
                        </div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <SeverityChart data={severity} />
                    <TrendChart data={trends} />
                    <CategoryChart data={categories} />
                    <RegionChart data={regions} />
                    <BehaviorChart data={behaviorCondition} />
                    <WeeklyHeatmap data={weeklyHeatmap} />
                </div>

                {/* Full Width Charts */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                    <ActionCauseChart data={actionCauses} />
                </div>

                {/* AI Chat */}
                <div className="mb-8">
                    <AIChat />
                </div>

                {/* Footer */}
                <footer className="text-center text-sm text-gray-600 dark:text-gray-400 py-6 border-t border-gray-200 dark:border-gray-700">
                    <p>Near Miss Dashboard • Built with Next.js, Node.js & Gemini AI</p>
                    <p className="mt-1">Data: {formatNumber(overview.totalIncidents)} incidents across {overview.uniqueProjects} projects</p>
                </footer>
            </main>
        </div>
    );
}
