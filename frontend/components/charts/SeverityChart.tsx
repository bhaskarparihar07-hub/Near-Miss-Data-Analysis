'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getSeverityColor, getSeverityLabel } from '@/lib/utils';

interface SeverityData {
    level: number;
    count: number;
    label: string;
}

interface SeverityChartProps {
    data: SeverityData[];
}

export default function SeverityChart({ data }: SeverityChartProps) {
    const chartData = data.map(item => ({
        name: item.label,
        value: item.count,
        color: getSeverityColor(item.level),
    }));

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Severity Level Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
