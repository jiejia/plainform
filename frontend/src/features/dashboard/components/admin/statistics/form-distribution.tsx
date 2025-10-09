'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Layers, Clock } from "lucide-react";

export default function FormDistribution() {
    // 表单状态分布
    const statusData = [
        { name: '活跃中', value: 89, color: '#10b981' },
        { name: '已关闭', value: 45, color: '#6b7280' },
        { name: '草稿', value: 22, color: '#f59e0b' },
    ];

    // 提交时段分布
    const timeData = [
        { period: '00-06', count: 234, percentage: 2.7, label: '凌晨' },
        { period: '06-09', count: 1256, percentage: 14.4, label: '早晨' },
        { period: '09-12', count: 2134, percentage: 24.4, label: '上午' },
        { period: '12-15', count: 1876, percentage: 21.5, label: '中午' },
        { period: '15-18', count: 2345, percentage: 26.8, label: '下午' },
        { period: '18-24', count: 897, percentage: 10.2, label: '晚上' },
    ];

    const totalForms = statusData.reduce((sum, item) => sum + item.value, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 表单状态分布 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Layers className="w-5 h-5 mr-2 text-blue-600" />
                        表单状态分布
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <div className="flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {statusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex flex-col justify-center space-y-3">
                            {statusData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm text-gray-600">{item.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-900">{item.value}</p>
                                        <p className="text-xs text-gray-500">
                                            {((item.value / totalForms) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div className="pt-3 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">总计</span>
                                    <span className="text-lg font-bold text-gray-900">{totalForms}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* 提交时段分布 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-purple-600" />
                        提交时段分布
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="space-y-3">
                        {timeData.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-600 w-16">
                                    {item.period}
                                </span>
                                <span className="text-xs text-gray-500 w-10">
                                    {item.label}
                                </span>
                                <div className="flex-1">
                                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden">
                                        <div 
                                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg transition-all flex items-center justify-end pr-2"
                                            style={{ width: `${item.percentage}%` }}
                                        >
                                            <span className="text-xs font-medium text-white">
                                                {item.count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-12 text-right">
                                    {item.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">高峰时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">15-18时</p>
                            <p className="text-xs text-purple-600">26.8%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">低谷时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">00-06时</p>
                            <p className="text-xs text-gray-400">2.7%</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">工作时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">09-18时</p>
                            <p className="text-xs text-green-600">72.7%</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

