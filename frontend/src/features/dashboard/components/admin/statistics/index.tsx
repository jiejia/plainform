'use client'

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import MetricCards from "./metric-cards";
import FormTrend from "./form-trend";
import SubmissionOverview from "./submission-overview";
import ActiveForms from "./active-forms";
import FormDistribution from "./form-distribution";
import RecentActivities from "./recent-activities";
import { Card, CardBody } from "@heroui/react";
import Conditions from "./conditions";


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

                    {/* 表单创建趋势和提交概览 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormTrend />
                        <SubmissionOverview />
                    </div>

                    {/* 热门表单和最近活动 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ActiveForms />
                        <RecentActivities />
                    </div>

                    {/* 表单分布和时段统计 */}
                    <FormDistribution />
                </div>
            </Scroll>
        </div>
    );
}