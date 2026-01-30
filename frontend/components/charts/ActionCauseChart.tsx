'use client';

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

interface ActionCauseData {
    cause: string;
    count: number;
}

interface ActionCauseChartProps {
    data: ActionCauseData[];
}

const COLORS = [
    '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981',
    '#06b6d4', '#6366f1', '#f43f5e', '#84cc16', '#f97316',
];

export default function ActionCauseChart({ data }: ActionCauseChartProps) {
    const chartData = data.slice(0, 15).map((item, index) => ({
        name: item.cause,
        size: item.count,
        fill: COLORS[index % COLORS.length],
    }));

    const CustomContent = (props: any) => {
        const { x, y, width, height, name, size } = props;

        if (width < 50 || height < 30) return null;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: props.fill,
                        stroke: '#fff',
                        strokeWidth: 2,
                    }}
                />
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={12}
                    fontWeight="bold"
                >
                    {size}
                </text>
                {height > 50 && (
                    <text
                        x={x + width / 2}
                        y={y + height / 2 + 15}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={10}
                    >
                        {name.length > 20 ? name.substring(0, 20) + '...' : name}
                    </text>
                )}
            </g>
        );
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Action Cause Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={400}>
                <Treemap
                    data={chartData}
                    dataKey="size"
                    stroke="#fff"
                    fill="#8884d8"
                    content={<CustomContent />}
                >
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            border: 'none',
                            borderRadius: '8px',
                            color: '#fff'
                        }}
                        formatter={(value, name, props) => [`${value} incidents`, props.payload.name]}
                    />
                </Treemap>
            </ResponsiveContainer>
        </div>
    );
}
