'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FileText, TrendingUp, CheckCircle, Users } from "lucide-react";
import Figure from "@/features/core/components/admin/statistic/figure";
import { Figures, Statistic } from "@/features/form/types/statistic";

export default function MetricCards({ data }: { data: Figures }) {
    const metrics = [
        {
            title: "总提交数",
            value: data.total_submission_number.value,
            change: data.total_submission_number.growth_rate,
            changeType: data.total_submission_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: "日均提交数",
            value: data.average_submission_number.value,
            change: data.average_submission_number.growth_rate,
            changeType: data.average_submission_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: "平均完成率",
            value: data.average_finishing_rate.value + "%",
            change: data.average_finishing_rate.growth_rate,
            changeType: data.average_finishing_rate.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: CheckCircle,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: "独立访问IP",
            value: data.independent_ip_number.value,
            change: data.independent_ip_number.growth_rate,
            changeType: data.independent_ip_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
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
                        value={metric.value.toString()} 
                        icon={<Icon className={`w-6 h-6 ${metric.color}`} />} 
                        changeType={metric.changeType} 
                        change={metric.change.toString() + "%"} 
                    />
                );
            })}
        </div>
    );
}

