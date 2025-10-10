'use client'

import React from "react";
import { Clock, FileText, User } from "lucide-react";
import Chart from "@/features/core/components/admin/statistic/chart";

export default function RecentActivities() {
    // 静态数据 - 最近提交活动
    const activities = [
        {
            id: 1,
            formName: '用户满意度调查问卷',
            userName: '张三',
            time: '2分钟前',
            status: 'completed',
            avatar: 'ZS'
        },
        {
            id: 2,
            formName: '产品反馈收集表',
            userName: '李四',
            time: '5分钟前',
            status: 'completed',
            avatar: 'LS'
        },
        {
            id: 3,
            formName: '活动报名表单',
            userName: '王五',
            time: '12分钟前',
            status: 'completed',
            avatar: 'WW'
        },
        {
            id: 4,
            formName: '客户信息登记表',
            userName: '赵六',
            time: '25分钟前',
            status: 'completed',
            avatar: 'ZL'
        },
        {
            id: 5,
            formName: '在线预约表单',
            userName: '孙七',
            time: '38分钟前',
            status: 'completed',
            avatar: 'SQ'
        },
    ];

    return (
        <Chart title="最近提交活动">
            <div className="space-y-2">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {activity.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {activity.userName}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <FileText className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500 truncate">
                                        {activity.formName}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 flex-shrink-0 ml-2">
                            <Clock className="w-3 h-3" />
                            {activity.time}
                        </div>
                    </div>
                ))}
            </div>
        </Chart>
    );
}

