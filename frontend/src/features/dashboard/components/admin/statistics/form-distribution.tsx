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
import { FormDistribution as FormDistributionType } from "@/features/dashboard/types/statistic";



ChartJS.register(ArcElement, Tooltip, Legend);

export default function FormDistribution({ data }: { data: FormDistributionType }) {
    // 表单状态分布
    const statusData = [
        { name: '活跃中', value: data.active, color: '#10b981' },
        { name: '已关闭', value: data.closed, color: '#6b7280' },
        { name: '已开启', value: data.enabled, color: '#f59e0b' },
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
    );
}

