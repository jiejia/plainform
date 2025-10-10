'use client'

import React from "react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function AdditionalStats() {
    // IP地理位置分布
    const locationData = [
        { city: '北京', count: 342, percentage: 27.7 },
        { city: '上海', count: 256, percentage: 20.7 },
        { city: '深圳', count: 198, percentage: 16.0 },
        { city: '广州', count: 145, percentage: 11.7 },
        { city: '杭州', count: 112, percentage: 9.1 },
        { city: '成都', count: 89, percentage: 7.2 },
        { city: '其他', count: 92, percentage: 7.5 },
    ];

    // 提交时段分析（按时间段）
    const timeSlotData = [
        { period: '00-03', count: 12, label: '凌晨' },
        { period: '03-06', count: 8, label: '清晨' },
        { period: '06-09', count: 45, label: '早晨' },
        { period: '09-12', count: 156, label: '上午' },
        { period: '12-15', count: 134, label: '中午' },
        { period: '15-18', count: 178, label: '下午' },
        { period: '18-21', count: 142, label: '傍晚' },
        { period: '21-24', count: 89, label: '夜晚' },
    ];

    const chartData = {
        labels: timeSlotData.map(item => item.period),
        datasets: [
            {
                label: '提交次数',
                data: timeSlotData.map(item => item.count),
                backgroundColor: '#059669',
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#1f2937',
                bodyColor: '#6b7280',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                callbacks: {
                    title: function (context) {
                        const index = context[0].dataIndex;
                        return timeSlotData[index].label;
                    },
                    label: function (context) {
                        return context.parsed.y + ' 次';
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                border: {
                    display: false,
                },
                grid: {
                    color: '#f0f0f0',
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Chart title="地理位置分布 (Top 7)">
                <div className="space-y-3">
                    {locationData.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-sm font-medium text-gray-500 w-6">
                                    #{index + 1}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {location.city}
                                </span>
                                <div className="flex-1 mx-4">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                            style={{ width: `${location.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                    {location.count}
                                </span>
                                <span className="text-xs text-gray-500 mb-0.5">
                                    {location.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Chart>

            <Chart title="提交时段分析">
                <div className="w-full" style={{ height: '280px' }}>
                    <Bar data={chartData} options={options} />
                </div>
            </Chart>
        </div>
    );
}

