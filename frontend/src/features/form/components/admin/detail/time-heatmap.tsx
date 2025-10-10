'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Chart from "@/features/core/components/admin/statistic/chart";

export default function TimeHeatmap() {
    // 生成静态热力图数据 (小时 x 星期)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

    // 静态数据：每个时间段的提交次数
    const heatmapData: number[][] = [
        // 周一到周日，每天24小时的数据
        [2, 1, 0, 0, 0, 1, 3, 8, 15, 22, 18, 16, 14, 12, 18, 20, 22, 18, 12, 8, 5, 4, 3, 2],
        [1, 1, 0, 0, 0, 2, 4, 10, 18, 25, 20, 18, 15, 14, 20, 22, 24, 20, 14, 9, 6, 4, 2, 1],
        [2, 0, 0, 0, 1, 2, 5, 12, 20, 28, 24, 20, 18, 16, 22, 25, 26, 22, 16, 10, 7, 5, 3, 2],
        [1, 1, 0, 0, 0, 1, 4, 9, 16, 24, 22, 19, 17, 15, 21, 23, 25, 21, 15, 11, 8, 6, 4, 2],
        [2, 1, 0, 0, 0, 2, 5, 11, 19, 26, 23, 21, 19, 17, 23, 26, 28, 24, 17, 12, 9, 6, 4, 3],
        [3, 2, 1, 0, 0, 1, 2, 5, 8, 12, 15, 14, 16, 18, 20, 22, 24, 20, 16, 12, 10, 8, 6, 4],
        [2, 2, 1, 0, 0, 0, 1, 3, 6, 10, 12, 11, 13, 15, 18, 20, 22, 18, 14, 10, 8, 6, 5, 3],
    ];

    const maxValue = Math.max(...heatmapData.flat());

    const getColor = (value: number) => {
        if (value === 0) return '#f3f4f6';
        const intensity = value / maxValue;
        if (intensity > 0.75) return '#1e40af';
        if (intensity > 0.5) return '#3b82f6';
        if (intensity > 0.25) return '#60a5fa';
        return '#93c5fd';
    };

    return (
        <Chart title="提交时段热力图">
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* 小时标签 */}
                    <div className="flex mb-2">
                        <div className="w-16" /> {/* 空白区域对齐星期标签 */}
                        {hours.map(hour => (
                            <div
                                key={hour}
                                className="flex-1 text-center text-xs text-gray-500"
                            >
                                {hour % 3 === 0 ? `${hour}h` : ''}
                            </div>
                        ))}
                    </div>

                    {/* 热力图网格 */}
                    {days.map((day, dayIndex) => (
                        <div key={day} className="flex items-center mb-1">
                            <div className="w-16 text-xs text-gray-600">{day}</div>
                            <div className="flex-1 flex gap-1">
                                {heatmapData[dayIndex].map((value, hourIndex) => (
                                    <div
                                        key={hourIndex}
                                        className="flex-1 h-8 rounded transition-all hover:opacity-80 cursor-pointer group relative"
                                        style={{ backgroundColor: getColor(value) }}
                                        title={`${day} ${hourIndex}:00 - ${value} 次提交`}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                            {day} {hourIndex}:00<br />
                                            {value} 次提交
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Chart>
    );
}

