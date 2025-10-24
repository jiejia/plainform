'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { TimeHeatmap as TimeHeatmapType } from "@/features/form/types/statistic";
import { useTranslations } from "next-intl";

export default function TimeHeatmap( { data }: { data: TimeHeatmapType } ) {
    const t = useTranslations();
    
    // 生成静态热力图数据 (小时 x 星期)
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = [
        t('form.monday'),
        t('form.tuesday'),
        t('form.wednesday'),
        t('form.thursday'),
        t('form.friday'),
        t('form.saturday'),
        t('form.sunday')
    ];

    // 静态数据：每个时间段的提交次数
    const heatmapData: number[][] = data;

    const maxValue = Math.max(...heatmapData.flat());

    const getColor = (value: number) => {
        if (value === 0) return 'bg-content4';
        const intensity = value / maxValue;
        if (intensity > 0.75) return 'bg-primary-700';
        if (intensity > 0.5) return 'bg-primary';
        if (intensity > 0.25) return 'bg-primary-400';
        return 'bg-primary-200';
    };

    return (
        <Chart title={t('form.submission_time_heatmap')}>
            <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                    {/* 小时标签 */}
                    <div className="flex mb-2">
                        <div className="w-16" /> {/* 空白区域对齐星期标签 */}
                        {hours.map(hour => (
                            <div
                                key={hour}
                                className="flex-1 text-center text-xs"
                            >
                                {hour % 3 === 0 ? `${hour}h` : ''}
                            </div>
                        ))}
                    </div>

                    {/* 热力图网格 */}
                    {days.map((day, dayIndex) => (
                        <div key={day} className="flex items-center mb-1">
                            <div className="w-16 text-xs">{day}</div>
                            <div className="flex-1 flex gap-1">
                                {heatmapData[dayIndex].map((value, hourIndex) => (
                                    <div
                                        key={hourIndex}
                                        className={`flex-1 h-8 rounded transition-all hover:opacity-80 cursor-pointer group relative ${getColor(value)}`}
                                        title={`${day} ${hourIndex}:00 - ${value} ${t('form.times_submission')}`}
                                    >
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-content1 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                                            {day} {hourIndex}:00<br />
                                            {value} {t('form.times_submission')}
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

