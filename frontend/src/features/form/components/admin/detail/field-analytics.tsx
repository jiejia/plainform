'use client'

import React from "react";
import { Card, CardBody, CardHeader, Progress } from "@heroui/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Eye, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FieldAnalytics() {
    const t = useTranslations('form');
    // 单选字段数据 - 饼图
    const genderData = [
        { name: t('male'), value: 556, percentage: 45 },
        { name: t('female'), value: 642, percentage: 52 },
        { name: t('other'), value: 36, percentage: 3 },
    ];

    // 年龄分布 - 柱状图
    const ageData = [
        { range: '18-25', count: 234 },
        { range: '26-35', count: 456 },
        { range: '36-45', count: 312 },
        { range: '46-55', count: 156 },
        { range: '55+', count: 76 },
    ];

    // 必填字段完成率
    const completionData = [
        { field: '姓名', rate: 98 },
        { field: '邮箱', rate: 95 },
        { field: '手机号', rate: 92 },
        { field: '公司名称', rate: 78 },
        { field: '职位', rate: 65 },
    ];

    const COLORS = ['#0070f3', '#10b981', '#f59e0b'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 性别分布 - 饼图 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Eye className="w-5 h-5 mr-2 text-purple-600" />
                        性别分布
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={genderData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percentage }) => `${name} ${percentage}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {genderData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {genderData.map((item, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <div 
                                            className="w-3 h-3 rounded-full" 
                                            style={{ backgroundColor: COLORS[index] }}
                                        />
                                        <span className="text-sm text-gray-600">{item.name}</span>
                                    </div>
                                    <p className="text-lg font-semibold mt-1">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* 年龄分布 - 柱状图 */}
            <Card className="flex flex-col">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-green-600" />
                        年龄分布
                    </h3>
                </CardHeader>
                <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={ageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis 
                                    dataKey="range" 
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
                                <Bar dataKey="count" fill="#0070f3" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                        <div className="text-center mt-4">
                            <p className="text-sm text-gray-500">
                                平均年龄: <span className="font-semibold text-gray-900">32.5岁</span>
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* 必填字段完成率 */}
            <Card className="flex flex-col lg:col-span-2">
                <CardHeader className="pb-2">
                    <h3 className="text-lg font-semibold">必填字段完成情况</h3>
                </CardHeader>
                <CardBody className="pt-0">
                    <div className="space-y-4">
                        {completionData.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{item.field}</span>
                                    <span className="text-sm font-semibold text-gray-900">{item.rate}%</span>
                                </div>
                                <Progress 
                                    value={item.rate} 
                                    color={item.rate >= 90 ? "success" : item.rate >= 70 ? "warning" : "danger"}
                                    size="sm"
                                    className="max-w-full"
                                />
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
