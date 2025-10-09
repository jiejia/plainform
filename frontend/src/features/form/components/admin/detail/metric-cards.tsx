'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FileText, TrendingUp, CheckCircle, Users } from "lucide-react";
import Figure from "@/features/core/components/admin/statistic/figure";

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
                    <Figure 
                        key={index} 
                        title={metric.title} 
                        value={metric.value} 
                        icon={<Icon className={`w-6 h-6 ${metric.color}`} />} 
                        changeType={metric.changeType} 
                        change={metric.change} 
                    />
                );
            })}
        </div>
    );
}

