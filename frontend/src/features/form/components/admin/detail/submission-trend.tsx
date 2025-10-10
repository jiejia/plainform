'use client'

import React, { useState } from "react";
import Chart from "@/features/core/components/admin/statistic/chart";
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

export default function SubmissionTrend() {
    const [period, setPeriod] = useState('7');

    // 静态数据
    const data = [
        { date: '10/03', count: 45, success: 42 },
        { date: '10/04', count: 52, success: 48 },
        { date: '10/05', count: 48, success: 45 },
        { date: '10/06', count: 68, success: 65 },
        { date: '10/07', count: 58, success: 55 },
        { date: '10/08', count: 72, success: 70 },
        { date: '10/09', count: 65, success: 62 },
    ];

    const stats = {
        peak: { date: '10/08', count: 72 },
        average: 58,
        growth: '+12.5%',
    };

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: '总提交',
                data: data.map(item => item.count),
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
                label: '有效提交',
                data: data.map(item => item.success),
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
        <Chart title="提交趋势">
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </Chart>
    );
}

