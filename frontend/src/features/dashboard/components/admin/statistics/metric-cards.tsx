'use client'

import React from "react";
import { FileText, TrendingUp, CheckCircle, BarChart3, Users, Activity } from "lucide-react";
import Figure from "@/features/core/components/admin/statistic/figure";
import { Figures } from "@/features/dashboard/types/statistic";
import { useTranslations } from 'next-intl';

export default function MetricCards({ data }: { data: Figures }) {
    const t = useTranslations('dashboard');
    
    const metrics = [
        {
            title: t('new_forms'),
            value: data.form_number.value,
            change: data.form_number.growth_rate,
            changeType: data.form_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: FileText,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
        },
        {
            title: t('new_submissions'),
            value: data.submission_number.value,
            change: data.submission_number.growth_rate,
            changeType: data.submission_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: BarChart3,
            color: "text-green-600",
            bgColor: "bg-green-100",
        },
        {
            title: t('new_views'),
            value: data.view_number.value,
            change: data.view_number.growth_rate,
            changeType: data.view_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: TrendingUp,
            color: "text-purple-600",
            bgColor: "bg-purple-100",
        },
        {
            title: t('active_forms'),
            value: data.active_form_number.value,
            change: data.active_form_number.growth_rate,
            changeType: data.active_form_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: Activity,
            color: "text-orange-600",
            bgColor: "bg-orange-100",
        },
        {
            title: t('independent_ip'),
            value: data.independent_ip_number.value,
            change: data.independent_ip_number.growth_rate,
            changeType: data.independent_ip_number.growth_rate >= 0 ? "increase" as const : "decrease" as const,
            icon: Users,
            color: "text-pink-600",
            bgColor: "bg-pink-100",
        },
        {
            title: t('average_completion_rate'),
            value: data.average_finishing_rate.value,
            change: data.average_finishing_rate.growth_rate,
            changeType: data.average_finishing_rate.growth_rate >= 0 ? "increase" as const : "decrease" as const,
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
                        value={metric.value.toString()}
                        icon={<Icon className={`w-5 h-5 ${metric.color}`} />}
                        changeType={metric.changeType}
                        change={Math.abs(metric.change).toString() + "%"}
                    />
                );
            })}
        </div>
    );
}

