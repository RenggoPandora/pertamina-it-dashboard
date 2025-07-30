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

    const labels = data.map(item => item.label);
    const values = data.map(item => item.value);
    const colors = data.map(item => item.color || '#3b82f6');

    return (
        <div className="w-full">
            <BarChart
                layout={layout}
                width={width}
                height={height}
                series={[
                    {
                        data: values,
                        color: (ctx) => colors[ctx.dataIndex],
                        label: seriesLabel,
                    },
                ]}
                xAxis={
                    layout === 'vertical'
                        ? [{ data: labels, scaleType: 'band' }]
                        : [{ min: 0 }]
                }
                yAxis={
                    layout === 'horizontal'
                        ? [{ data: labels, scaleType: 'band' }]
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