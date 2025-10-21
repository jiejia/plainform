'use client'

import React from "react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { SubmissionDistribution as SubmissionDistributionType } from "@/features/dashboard/types/statistic";
import { useTranslations } from 'next-intl';

export default function SubmissionDistribution({ data }: { data: SubmissionDistributionType[] }) {
    const t = useTranslations('dashboard');

    return (
        <Chart title={t('submission_time_distribution')}>
            <div className="space-y-3">
                {data.map((item, index) => (
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
        </Chart>);
}