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

export default function SubmissionOverview() {
    // 静态数据 - 最近30天的提交概览
    const data = [
        { date: '09/10', total: 245, success: 232, unique: 198 },
        { date: '09/12', total: 312, success: 298, unique: 256 },
        { date: '09/14', total: 278, success: 265, unique: 234 },
        { date: '09/16', total: 356, success: 342, unique: 289 },
        { date: '09/18', total: 423, success: 401, unique: 345 },
        { date: '09/20', total: 289, success: 276, unique: 241 },
        { date: '09/22', total: 467, success: 445, unique: 378 },
        { date: '09/24', total: 392, success: 374, unique: 321 },
        { date: '09/26', total: 445, success: 423, unique: 367 },
        { date: '09/28', total: 523, success: 498, unique: 412 },
        { date: '09/30', total: 478, success: 456, unique: 389 },
        { date: '10/02', total: 401, success: 384, unique: 334 },
        { date: '10/04', total: 556, success: 531, unique: 445 },
        { date: '10/06', total: 489, success: 467, unique: 398 },
        { date: '10/08', total: 512, success: 489, unique: 421 },
        { date: '10/09', total: 467, success: 445, unique: 387 },
    ];

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: '总提交',
                data: data.map(item => item.total),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: '成功提交',
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
            {
                label: '独立IP',
                data: data.map(item => item.unique),
                borderColor: '#f59e0b',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 5,
                pointBackgroundColor: '#f59e0b',
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
        <Chart title="提交概览">
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </Chart>
    );
}

