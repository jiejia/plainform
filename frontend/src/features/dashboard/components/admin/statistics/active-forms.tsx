'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { TrendingUp, Eye } from "lucide-react";

export default function ActiveForms() {
    // 静态数据 - Top 10 活跃表单
    const forms = [
        { 
            id: 1,
            name: '用户满意度调查问卷', 
            submissions: 1234,
            views: 3421,
            rate: 36.1,
            trend: '+12.3%',
            status: 'active'
        },
        { 
            id: 2,
            name: '产品反馈收集表', 
            submissions: 987,
            views: 2156,
            rate: 45.8,
            trend: '+8.7%',
            status: 'active'
        },
        { 
            id: 3,
            name: '活动报名表单', 
            submissions: 856,
            views: 1892,
            rate: 45.2,
            trend: '+15.4%',
            status: 'active'
        },
        { 
            id: 4,
            name: '客户信息登记表', 
            submissions: 745,
            views: 1654,
            rate: 45.0,
            trend: '+5.2%',
            status: 'active'
        },
        { 
            id: 5,
            name: '在线预约表单', 
            submissions: 623,
            views: 1423,
            rate: 43.8,
            trend: '+9.8%',
            status: 'active'
        },
        { 
            id: 6,
            name: '意见建议反馈表', 
            submissions: 534,
            views: 1287,
            rate: 41.5,
            trend: '+6.3%',
            status: 'active'
        },
        { 
            id: 7,
            name: '招聘申请表', 
            submissions: 467,
            views: 1134,
            rate: 41.2,
            trend: '+11.2%',
            status: 'active'
        },
        { 
            id: 8,
            name: '会员注册表单', 
            submissions: 398,
            views: 987,
            rate: 40.3,
            trend: '+4.5%',
            status: 'active'
        },
        { 
            id: 9,
            name: '订单信息收集表', 
            submissions: 345,
            views: 876,
            rate: 39.4,
            trend: '+7.8%',
            status: 'active'
        },
        { 
            id: 10,
            name: '培训报名表', 
            submissions: 289,
            views: 745,
            rate: 38.8,
            trend: '+3.9%',
            status: 'active'
        },
    ];

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                        热门表单 Top 10
                    </h3>
                    <span className="text-sm text-gray-500">按提交数排序</span>
                </div>
            </CardHeader>
            <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                <div className="space-y-2">
                    {forms.map((form, index) => (
                        <div 
                            key={form.id} 
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
                                        {form.name}
                                    </p>
                                    <div className="flex items-center gap-3 mt-0.5">
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {form.views} 浏览
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            转化率 {form.rate}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-lg font-bold text-gray-900">
                                        {form.submissions}
                                    </p>
                                    <p className="text-xs text-green-600 font-medium">
                                        {form.trend}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

