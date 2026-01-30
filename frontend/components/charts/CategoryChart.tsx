'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { truncate } from '@/lib/utils';

interface CategoryData {
    category: string;
    count: number;
}

interface CategoryChartProps {
    data: CategoryData[];
}

export default function CategoryChart({ data }: CategoryChartProps) {
    // Take top 10 categories
    const chartData = data.slice(0, 10).map(item => ({
        ...item,
        displayName: truncate(item.category, 25),
    }));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Top Incident Categories
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                        type="number"
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af' }}
                    />
                    <YAxis
                        type="category"
                        dataKey="displayName"
                        width={150}
                        stroke="#9ca3af"
                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        formatter={(value, name, props) => [value, props.payload.category]}
                    />
                    <Legend />
                    <Bar
                        dataKey="count"
                        fill="#8b5cf6"
                        name="Incidents"
                        radius={[0, 4, 4, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
