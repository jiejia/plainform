'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

    const stats = {
        totalSubmissions: 6834,
        averageDaily: 427,
        successRate: '95.4%',
        growth: '+24.5%',
    };

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="text-lg font-semibold">提交概览</h3>
                        <div className="flex gap-4 mt-1 text-sm text-gray-500">
                            <span>总提交: <span className="font-semibold text-gray-900">{stats.totalSubmissions}</span></span>
                            <span>日均: <span className="font-semibold text-gray-900">{stats.averageDaily}</span>次</span>
                            <span>成功率: <span className="font-semibold text-green-600">{stats.successRate}</span></span>
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
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
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
                                dataKey="total" 
                                stroke="#6366f1" 
                                fill="url(#colorTotal)" 
                                strokeWidth={2}
                                name="总提交"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="success" 
                                stroke="#10b981" 
                                fill="url(#colorSuccess)" 
                                strokeWidth={2}
                                name="成功提交"
                            />
                            <Area 
                                type="monotone" 
                                dataKey="unique" 
                                stroke="#f59e0b" 
                                fill="url(#colorUnique)" 
                                strokeWidth={2}
                                name="独立IP"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardBody>
        </Card>
    );
}

