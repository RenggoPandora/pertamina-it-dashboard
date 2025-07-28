import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MUIBarChart({ data, title, colors, height = 250, width = 400 }) {
    const chartData = data.map(item => ({
        ...item,
        color: item.color || '#3b82f6'
    }));

    const xAxisData = chartData.map(item => item.label);
    const seriesData = chartData.map(item => item.value);

    return (
        <div className="w-full">
            <BarChart
                width={width}
                height={height}
                series={[
                    {
                        data: seriesData,
                        color: colors || '#3b82f6',
                    },
                ]}
                xAxis={[
                    {
                        data: xAxisData,
                        scaleType: 'band',
                    },
                ]}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 40,
                }}
                slotProps={{
                    bar: {
                        rx: 4,
                    },
                }}
            />
        </div>
    );
}
