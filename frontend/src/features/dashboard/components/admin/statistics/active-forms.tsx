'use client'

import React from "react";
import { Eye } from "lucide-react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { ActiveForms as ActiveFormsType } from "@/features/dashboard/types/statistic";
import { useTranslations } from 'next-intl';

interface ActiveFormsProps {
    data: ActiveFormsType[];
}

export default function ActiveForms({ data }: ActiveFormsProps) {
    const forms = data || [];
    const t = useTranslations('dashboard');

    return (
        <Chart title={t('hot_forms_top5')}>
                <div className="space-y-2">
                    {forms.map((form, index) => (
                        <div 
                            key={form.no} 
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <span className={`text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full ${
                                    index < 3 
                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                                        : 'bg-gray-100 text-gray-600'
                                }`}>
                                    #{index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {form.title}
                                    </p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {form.views} {t('views')}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {t('conversion_rate')} {form.rate}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        {form.submissions}
                                    </p>
                                    <p className={`text-xs font-medium ${
                                        form.trend > 0 
                                            ? 'text-green-600' 
                                            : form.trend < 0 
                                            ? 'text-red-600' 
                                            : 'text-gray-600'
                                    }`}>
                                        {form.trend > 0 ? '+' : ''}{form.trend}%
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </Chart>
    );
}

