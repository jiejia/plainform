'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { FileText, TrendingUp, CheckCircle, BarChart3, Users, Activity } from "lucide-react";
import Figure from "@/features/core/components/admin/statistic/figure";

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
                    <Figure
                        key={index}
                        title={metric.title}
                        value={metric.value}
                        icon={<Icon className={`w-5 h-5 ${metric.color}`} />}
                        changeType={metric.changeType}
                        change={metric.change}
                    />
                );
            })}
        </div>
    );
}

