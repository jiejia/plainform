'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { TrendingUp } from "lucide-react";

export default function Figure(
    { title, value, icon, changeType, change}: 
    { title: string, value: string, icon: React.ReactNode, changeType: string, change: string }
) {


    return (
        <Card>
            <CardBody className="flex flex-row items-center justify-between p-4">
                <div>
                    <p className="text-sm text-gray-600 mb-1">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className={`text-xs flex items-center mt-1 ${changeType === 'increase'
                            ? 'text-green-600'
                            : changeType === 'decrease'
                                ? 'text-red-600'
                                : 'text-gray-500'
                        }`}>
                        {changeType === 'increase' && <TrendingUp className="w-3 h-3 mr-1" />}
                        {change}
                    </p>
                </div>
                <div className={`p-3 rounded-lg`}>
                    {icon}
                </div>
            </CardBody>
        </Card>
    )
}