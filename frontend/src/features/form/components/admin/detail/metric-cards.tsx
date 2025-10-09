'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FileText, TrendingUp, CheckCircle, Users } from "lucide-react";

export default function MetricCards() {
    const metrics = [
        {
            title: "总提交数",
            value: "1,234",
            change: "+12%",
            changeType: "increase" as const,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "今日提交",
            value: "48",
            change: "+8.5%",
            changeType: "increase" as const,
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "平均完成率",
            value: "87.5%",
            change: "+2.3%",
            changeType: "increase" as const,
            icon: CheckCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "独立访问IP",
            value: "856",
            change: "+5.2%",
            changeType: "increase" as const,
            icon: Users,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                    <Card key={index}>
                        <CardBody className="flex flex-row items-center justify-between p-4">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
                                <p className="text-2xl font-bold">{metric.value}</p>
                                <p className={`text-xs flex items-center mt-1 ${
                                    metric.changeType === 'increase' 
                                        ? 'text-green-600' 
                                        : metric.changeType === 'decrease'
                                        ? 'text-red-600'
                                        : 'text-gray-500'
                                }`}>
                                    {metric.changeType === 'increase' && <TrendingUp className="w-3 h-3 mr-1" />}
                                    {metric.change}
                                </p>
                            </div>
                            <div className={`${metric.bgColor} p-3 rounded-lg`}>
                                <Icon className={`w-6 h-6 ${metric.color}`} />
                            </div>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
}

