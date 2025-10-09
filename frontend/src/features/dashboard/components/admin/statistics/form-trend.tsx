'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

    const stats = {
        totalCreated: 84,
        averageDaily: 5.3,
        growth: '+18.2%',
        activeRate: '89.3%',
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="text-lg font-semibold">表单创建趋势</h3>
                        <div className="flex gap-4 mt-1 text-sm text-gray-500">
                            <span>新增表单: <span className="font-semibold text-gray-900">{stats.totalCreated}</span></span>
                            <span>日均: <span className="font-semibold text-gray-900">{stats.averageDaily}</span>个</span>
                            <span>活跃率: <span className="font-semibold text-green-600">{stats.activeRate}</span></span>
                            <span className="text-green-600 font-semibold">{stats.growth}</span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500">最近30天</span>
                </div>
            </CardHeader>
            <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0070f3" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#0070f3" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
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
                            <Legend 
                                wrapperStyle={{ paddingTop: '10px' }}
                                iconType="circle"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="created" 
                                stroke="#0070f3" 
                                fill="url(#colorCreated)" 
                                strokeWidth={2}
                                name="新建表单"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="active" 
                                stroke="#10b981" 
                                fill="url(#colorActive)" 
                                strokeWidth={2}
                                name="活跃表单"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
}

