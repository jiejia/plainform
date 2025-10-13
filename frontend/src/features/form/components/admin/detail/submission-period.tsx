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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function SubmissionPeriod() {
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
        <Chart title="提交时段分析">
            <div className="w-full" style={{ height: '280px' }}>
                <Bar data={chartData} options={options} />
            </div>
        </Chart>
    )
}