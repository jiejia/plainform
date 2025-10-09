'use client'

import React, { useState } from "react";
import { Card, CardBody, CardHeader, Button, ButtonGroup } from "@heroui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="text-lg font-semibold">提交趋势</h3>
                        <div className="flex gap-4 mt-1 text-sm text-gray-500">
                            <span>峰值: <span className="font-semibold text-gray-900">{stats.peak.count}</span></span>
                            <span>平均: <span className="font-semibold text-gray-900">{stats.average}</span>/天</span>
                            <span className="text-green-600 font-semibold">{stats.growth}</span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">最近7天</span>
                </div>
            </CardHeader>
            <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
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
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
}

