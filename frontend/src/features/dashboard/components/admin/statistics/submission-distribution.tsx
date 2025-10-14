'use client'

import React from "react";
import Chart from "@/features/core/components/admin/statistic/chart";

export default function SubmissionDistribution() {
    // 提交时段分布
    const timeData = [
        { period: '00-06', count: 234, percentage: 2.7, label: '凌晨' },
        { period: '06-09', count: 1256, percentage: 14.4, label: '早晨' },
        { period: '09-12', count: 2134, percentage: 24.4, label: '上午' },
        { period: '12-15', count: 1876, percentage: 21.5, label: '中午' },
        { period: '15-18', count: 2345, percentage: 26.8, label: '下午' },
        { period: '18-24', count: 897, percentage: 10.2, label: '晚上' },
    ];

    return (
        <Chart title="提交时段分布">
            <div className="space-y-3">
                {timeData.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 w-16">
                            {item.period}
                        </span>
                        <span className="text-xs text-gray-500 w-10">
                            {item.label}
                        </span>
                        <div className="flex-1">
                            <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg transition-all flex items-center justify-end pr-2"
                                    style={{ width: `${item.percentage}%` }}
                                >
                                    <span className="text-xs font-medium text-white">
                                        {item.count}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-12 text-right">
                            {item.percentage}%
                        </span>
                    </div>
                ))}
            </div>
        </Chart>);
}