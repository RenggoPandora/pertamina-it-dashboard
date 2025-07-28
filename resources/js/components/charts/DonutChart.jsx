import React from 'react';

export default function DonutChart({ data, size = 140, strokeWidth = 12 }) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;
    
    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    // Calculate percentages and cumulative angles
    let cumulativePercentage = 0;
    const segments = data.map(item => {
        const percentage = (item.value / total) * 100;
        const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
        const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
        
        cumulativePercentage += percentage;
        
        return {
            ...item,
            percentage,
            strokeDasharray,
            strokeDashoffset
        };
    });

    return (
        <div className="flex flex-col items-center">
            <div className="relative" style={{ width: size, height: size }}>
                <svg 
                    width={size} 
                    height={size} 
                    className="transform -rotate-90"
                    viewBox={`0 0 ${size} ${size}`}
                >
                    {/* Background circle */}
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                    />
                    
                    {/* Data segments */}
                    {segments.map((segment, index) => (
                        <circle
                            key={index}
                            cx={center}
                            cy={center}
                            r={radius}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={segment.strokeDasharray}
                            strokeDashoffset={segment.strokeDashoffset}
                            strokeLinecap="round"
                            style={{
                                transition: 'stroke-dasharray 0.3s ease-in-out'
                            }}
                        />
                    ))}
                </svg>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {total}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Total
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Legend */}
            <div className="mt-4 space-y-2 w-full">
                {segments.map((segment, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <div 
                                className="w-3 h-3 rounded mr-2" 
                                style={{ backgroundColor: segment.color }}
                            ></div>
                            <span className="text-gray-700 dark:text-gray-300">{segment.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-900 dark:text-white font-medium">{segment.value}</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs">
                                ({Math.round(segment.percentage)}%)
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
