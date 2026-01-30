'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface HeatmapData {
    week: number;
    count: number;
}

interface WeeklyHeatmapProps {
    data: HeatmapData[];
}

export default function WeeklyHeatmap({ data }: WeeklyHeatmapProps) {
    // Get color based on count
    const getColor = (count: number) => {
        const max = Math.max(...data.map(d => d.count));
        const intensity = count / max;

        if (intensity > 0.75) return '#ef4444';
        if (intensity > 0.5) return '#f59e0b';
        if (intensity > 0.25) return '#3b82f6';
        return '#10b981';
    };

    const chartData = data.map(item => ({
        ...item,
        fill: getColor(item.count),
    }));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Weekly Incident Heatmap
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        dataKey="week"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        label={{ value: 'Week of Year', position: 'insideBottom', offset: -5, fill: '#9ca3af' }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                        label={{ value: 'Incidents', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        formatter={(value) => [`${value} incidents`, 'Count']}
                    />
                    <Bar
                        dataKey="count"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Low</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Medium</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">High</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="text-gray-600 dark:text-gray-400">Critical</span>
                </div>
            </div>
        </div>
    );
}
