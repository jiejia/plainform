'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Layers, Clock } from "lucide-react";
import Chart from "@/features/core/components/admin/statistic/chart";



ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormDistribution() {
    // 表单状态分布
    const statusData = [
        { name: '活跃中', value: 89, color: '#10b981' },
        { name: '已关闭', value: 45, color: '#6b7280' },
        { name: '草稿', value: 22, color: '#f59e0b' },
    ];

    // 提交时段分布
    const timeData = [
        { period: '00-06', count: 234, percentage: 2.7, label: '凌晨' },
        { period: '06-09', count: 1256, percentage: 14.4, label: '早晨' },
        { period: '09-12', count: 2134, percentage: 24.4, label: '上午' },
        { period: '12-15', count: 1876, percentage: 21.5, label: '中午' },
        { period: '15-18', count: 2345, percentage: 26.8, label: '下午' },
        { period: '18-24', count: 897, percentage: 10.2, label: '晚上' },
    ];

    const totalForms = statusData.reduce((sum, item) => sum + item.value, 0);

    const chartData = {
        labels: statusData.map(item => item.name),
        datasets: [
            {
                data: statusData.map(item => item.value),
                backgroundColor: statusData.map(item => item.color),
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'doughnut'> = {
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
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const percentage = ((value / totalForms) * 100).toFixed(1);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        cutout: '60%',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Chart title="表单状态分布">
                <div className="grid grid-cols-2 gap-4 h-full">
                    <div className="flex items-center justify-center">
                        <div style={{ width: '100%', height: '200px' }}>
                            <Doughnut data={chartData} options={options} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-center space-y-3">
                        {statusData.map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                    <p className="text-xs text-gray-500">
                                        {((item.value / totalForms) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-3 border-t">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">总计</span>
                                <span className="text-lg font-bold text-gray-900">{totalForms}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Chart>
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
            </Chart>
        </div>
    );
}

