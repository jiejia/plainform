'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FileText, TrendingUp, CheckCircle, BarChart3, Users, Activity } from "lucide-react";

export default function MetricCards() {
    const metrics = [
        {
            title: "总表单数",
            value: "156",
            change: "+12",
            subtext: "本月新增",
            changeType: "increase" as const,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "总提交数",
            value: "8,742",
            change: "+324",
            subtext: "本月新增",
            changeType: "increase" as const,
            icon: BarChart3,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "今日提交",
            value: "156",
            change: "+23.5%",
            subtext: "较昨日",
            changeType: "increase" as const,
            icon: TrendingUp,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "活跃表单",
            value: "89",
            change: "57.1%",
            subtext: "占比",
            changeType: "neutral" as const,
            icon: Activity,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
        {
            title: "独立访问IP",
            value: "3,421",
            change: "+186",
            subtext: "本周新增",
            changeType: "increase" as const,
            icon: Users,
            color: "text-pink-600",
            bgColor: "bg-pink-100",
        },
        {
            title: "平均完成率",
            value: "84.2%",
            change: "+2.8%",
            subtext: "较上月",
            changeType: "increase" as const,
            icon: CheckCircle,
            color: "text-cyan-600",
            bgColor: "bg-cyan-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                    <Card key={index}>
                        <CardBody className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className={`${metric.bgColor} p-2.5 rounded-lg`}>
                                    <Icon className={`w-5 h-5 ${metric.color}`} />
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">{metric.title}</p>
                                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                                <div className="flex items-center gap-1">
                                    <span className={`text-xs font-medium ${
                                        metric.changeType === 'increase' 
                                            ? 'text-green-600' 
                                            : metric.changeType === 'decrease'
                                            ? 'text-red-600'
                                            : 'text-gray-500'
                                    }`}>
                                        {metric.change}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {metric.subtext}
                                    </span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
}

