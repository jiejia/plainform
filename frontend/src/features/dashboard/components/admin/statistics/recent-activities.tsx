'use client'

import React from "react";
import { Clock, FileText, CheckCircle2, Eye } from "lucide-react";
import Chart from "@/features/core/components/admin/statistic/chart";
import { RecentActivities as RecentActivitiesType } from "@/features/dashboard/types/statistic";

interface RecentActivitiesProps {
    data: RecentActivitiesType[];
}

export default function RecentActivities({ data }: RecentActivitiesProps) {
    return (
        <Chart title="最近活动 Top 5">
            <div className="space-y-2">
                {data.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                        <p className="text-sm">暂无活动记录</p>
                    </div>
                ) : (
                    data.map((activity, index) => (
                        <div
                            key={`${activity.id}-${index}`}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                    activity.status === 'completed' 
                                        ? 'bg-green-100 text-green-600' 
                                        : 'bg-blue-100 text-blue-600'
                                }`}>
                                    {activity.status === 'completed' ? (
                                        <CheckCircle2 className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {activity.visitor_region || '未知地区'} 的用户{activity.status === 'completed' ? '提交了' : '浏览了'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <FileText className="w-3 h-3 text-gray-400" />
                                        <span className="text-xs text-gray-500 truncate">
                                            {activity.form_title}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0 ml-2">
                                <Clock className="w-3 h-3" />
                                {activity.time}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Chart>
    );
}

