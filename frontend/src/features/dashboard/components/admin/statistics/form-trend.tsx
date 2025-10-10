'use client'

import React from "react";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
} from 'chart.js';
import Chart from "@/features/core/components/admin/statistic/chart";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function FormTrend() {
    // 静态数据 - 最近30天的表单创建趋势
    const data = [
        { date: '09/10', created: 3, active: 2, submissions: 42 },
        { date: '09/12', created: 5, active: 4, submissions: 58 },
        { date: '09/14', created: 2, active: 1, submissions: 45 },
        { date: '09/16', created: 4, active: 3, submissions: 67 },
        { date: '09/18', created: 6, active: 5, submissions: 82 },
        { date: '09/20', created: 3, active: 2, submissions: 54 },
        { date: '09/22', created: 7, active: 6, submissions: 93 },
        { date: '09/24', created: 4, active: 3, submissions: 71 },
        { date: '09/26', created: 5, active: 4, submissions: 88 },
        { date: '09/28', created: 8, active: 7, submissions: 105 },
        { date: '09/30', created: 6, active: 5, submissions: 96 },
        { date: '10/02', created: 4, active: 3, submissions: 78 },
        { date: '10/04', created: 9, active: 8, submissions: 112 },
        { date: '10/06', created: 5, active: 4, submissions: 89 },
        { date: '10/08', created: 7, active: 6, submissions: 98 },
        { date: '10/09', created: 6, active: 5, submissions: 87 },
    ];

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: '新建表单',
                data: data.map(item => item.created),
                borderColor: '#0070f3',
                backgroundColor: 'rgba(0, 112, 243, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#0070f3',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: '活跃表单',
                data: data.map(item => item.active),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'white',
                titleColor: '#1f2937',
                bodyColor: '#6b7280',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                    labelColor: function(context) {
                        return {
                            borderColor: context.dataset.borderColor as string,
                            backgroundColor: context.dataset.borderColor as string,
                            borderWidth: 2,
                            borderRadius: 2,
                        };
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
        <Chart title="表单创建趋势">
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </Chart>
    );
}

