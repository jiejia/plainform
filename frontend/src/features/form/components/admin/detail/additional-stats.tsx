'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { MapPin, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdditionalStats() {
    // IP地理位置分布
    const locationData = [
        { city: '北京', count: 342, percentage: 27.7 },
        { city: '上海', count: 256, percentage: 20.7 },
        { city: '深圳', count: 198, percentage: 16.0 },
        { city: '广州', count: 145, percentage: 11.7 },
        { city: '杭州', count: 112, percentage: 9.1 },
        { city: '成都', count: 89, percentage: 7.2 },
        { city: '其他', count: 92, percentage: 7.5 },
    ];

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 地理位置分布 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                        地理位置分布 (Top 7)
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="space-y-3">
                        {locationData.map((location, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <span className="text-sm font-medium text-gray-500 w-6">
                                        #{index + 1}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {location.city}
                                    </span>
                                    <div className="flex-1 mx-4">
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                                style={{ width: `${location.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-lg font-bold text-gray-900">
                                        {location.count}
                                    </span>
                                    <span className="text-xs text-gray-500 mb-0.5">
                                        {location.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/* 提交时段分析 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-green-600" />
                        提交时段分析
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={timeSlotData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="period" 
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
                                    formatter={(value: number, name: string, props: any) => {
                                        return [value + ' 次', props.payload.label];
                                    }}
                                />
                                <Bar 
                                    dataKey="count" 
                                    fill="#059669" 
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* 时段统计信息 */}
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div className="text-center">
                            <p className="text-sm text-gray-500">高峰时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">15-18时</p>
                            <p className="text-xs text-gray-400">178 次</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">低谷时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">03-06时</p>
                            <p className="text-xs text-gray-400">8 次</p>
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-gray-500">工作时段</p>
                            <p className="text-lg font-semibold text-gray-900 mt-1">09-18时</p>
                            <p className="text-xs text-gray-400">468 次 (61.4%)</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

