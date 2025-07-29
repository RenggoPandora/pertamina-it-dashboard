import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function MUIDonutChart({ data, title, centerText, size = 200 }) {
    const chartData = data.map((item, index) => ({
        id: index,
        value: item.value,
        label: item.label,
        color: item.color,
    }));

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <PieChart
                    series={[
                        {
                            data: chartData,
                            innerRadius: 60,
                            outerRadius: 80,
                            paddingAngle: 2,
                            cornerRadius: 3,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        },
                    ]}
                    width={size}
                    height={size}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
                {centerText && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                {centerText.value}
                            </div>
                            {centerText.label && (
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {centerText.label}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
