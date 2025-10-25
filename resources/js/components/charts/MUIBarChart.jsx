import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function MUIBarChart({
    data = [],
    height = 250,
    width = 400,
    layout = 'vertical',
    seriesLabel = 'Jumlah', 
}) {
    if (!data.length) return <div className="text-gray-500 text-sm">No chart data.</div>;

    // Untuk horizontal layout dengan warna berbeda per bar
    if (layout === 'horizontal') {
        const axisLabels = data.map(item => item.label);
        
        // Buat series terpisah untuk setiap item agar warnanya berbeda
        const series = data.map((item) => ({
            data: axisLabels.map(label => label === item.label ? item.value : 0),
            label: item.label,
            stack: 'total',
            color: item.color || '#34A8FF',
            valueFormatter: (value) => (value === 0 ? '' : value.toString()),
        }));

        return (
            <div className="w-full">
                <BarChart
                    layout={layout}
                    width={width}
                    height={height}
                    series={series}
                    xAxis={[{ min: 0 }]}
                    yAxis={[{ data: axisLabels, scaleType: 'band' }]}
                    margin={{
                        top: 10,
                        right: 10,
                        bottom: 30,
                        left: 50,
                    }}
                    slotProps={{
                        bar: { rx: 6 },
                        legend: { hidden: true },
                    }}
                    skipAnimation={false}
                />
            </div>
        );
    }

    // Untuk vertical layout
    const axisLabels = data.map(item => item.label);
    
    // Buat series terpisah untuk setiap item agar warnanya berbeda
    const series = data.map((item) => ({
        data: axisLabels.map(label => label === item.label ? item.value : 0),
        label: item.label,
        stack: 'total',
        color: item.color || '#34A8FF',
        valueFormatter: (value) => (value === 0 ? '' : value.toString()),
    }));

    return (
        <div className="w-full">
            <BarChart
                layout={layout}
                width={width}
                height={height}
                series={series}
                xAxis={[{ data: axisLabels, scaleType: 'band' }]}
                yAxis={[{}]}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 40,
                }}
                slotProps={{
                    bar: { rx: 6 },
                    legend: { hidden: true },
                }}
            />
        </div>
    );
}