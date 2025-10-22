'use client'

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
import { SubmissionPeriod as SubmissionPeriodType } from '@/features/form/types/statistic';
import { useTranslations } from "next-intl";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function SubmissionPeriod({ data }: { data: SubmissionPeriodType[] }) {

    const t = useTranslations();

    const chartData = {
        labels: data.map(item => item.period),
        datasets: [
            {
                label: t('form.submissions_count_label'),
                data: data.map(item => item.count),
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
                        return data[index].label;
                    },
                    label: function (context) {
                        return context.parsed.y + ' ' + t('form.times_suffix');
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
        <Chart title={t('form.submission_period_analysis')}>
            <div className="w-full" style={{ height: '280px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </Chart>
    )
}