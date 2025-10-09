'use client'

import React, { useState } from "react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

    return (
        <Chart title="提交趋势">
            <AreaChart data={data}
                margin={{ top: 10, right: 10, bottom: 0, left: -35 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#0070f3"
                    fill="#0070f3"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="总提交"
                />
                <Area
                    type="monotone"
                    dataKey="success"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    name="有效提交"
                />
            </AreaChart>
        </Chart>
    );
}

