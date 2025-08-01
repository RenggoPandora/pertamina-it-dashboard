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

    const series = data.map((item, index) => ({
        data: [item.value],
        label: item.label,
        color: item.color || '#34A8FF',
    }));

    const axisLabels = data.map(item => item.label);


    return (
        <div className="w-full">
            <BarChart
                layout={layout}
                width={width}
                height={height}
                series={series}
                xAxis={
                    layout === 'vertical'
                        ? [{ data: axisLabels, scaleType: 'band' }]
                        : [{ min: 0 }]
                }
                yAxis={
                    layout === 'horizontal'
                        ? [{ data: axisLabels, scaleType: 'band' }]
                        : [{}]
                }
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: layout === 'horizontal' ? 80 : 40,
                }}
                slotProps={{
                    bar: { rx: 6 },
                }}
            />
        </div>
    );
}