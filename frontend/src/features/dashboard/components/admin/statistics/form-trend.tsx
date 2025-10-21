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
import { FormTrend as FormTrendType } from "@/features/dashboard/types/statistic";
import { useTranslations } from 'next-intl';

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

interface FormTrendProps {
    data: FormTrendType[];
}

export default function FormTrend({ data }: FormTrendProps) {
    const t = useTranslations('dashboard');

    const chartData = {
        labels: data.map(item => item.point),
        datasets: [
            {
                label: t('new_form'),
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
                label: t('active_form'),
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
            // {
            //     label: '提交量',
            //     data: data.map(item => item.submissions),
            //     borderColor: '#f59e0b',
            //     backgroundColor: 'rgba(245, 158, 11, 0.1)',
            //     fill: true,
            //     tension: 0.4,
            //     pointRadius: 3,
            //     pointHoverRadius: 5,
            //     pointBackgroundColor: '#f59e0b',
            //     pointBorderColor: '#fff',
            //     pointBorderWidth: 2,
            // }
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
        <Chart title={t('form_trend')}>
            <div style={{ height: '300px' }}>
                <Line data={chartData} options={options} />
            </div>
        </Chart>
    );
}

