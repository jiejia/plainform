'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Conditions from "./conditions";
import Scroll from "@/features/core/components/shared/scroll";
import MetricCards from "./metric-cards";
import SubmissionTrend from "./submission-trend";
import TimeHeatmap from "./time-heatmap";
import AdditionalStats from "./additional-stats";

export default function Index() {
    return (
        <div className="grid grid-rows-[56px_1fr] gap-4 h-full">
            <Card className="h-full">
                <CardBody className="pt-3">
                    <Conditions />
                </CardBody>
            </Card>
            <Scroll>
                <div className="space-y-4">
                    {/* 核心指标卡片 */}
                    <MetricCards />
                    
                    {/* 提交趋势图和提交时段热力图 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <SubmissionTrend /> 
                        <TimeHeatmap />
                    </div>
                    
                    {/* 其他统计 */}
                    <AdditionalStats />
                </div>
            </Scroll>
        </div>
    )
}