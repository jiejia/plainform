'use client'

import React from "react";
import Scroll from "@/features/core/components/shared/scroll";
import MetricCards from "./metric-cards";
import FormTrend from "./form-trend";
import SubmissionOverview from "./submission-overview";
import ActiveForms from "./active-forms";
import FormDistribution from "./form-distribution";

export default function Index() {
    return (
        <Scroll>
            <div className="space-y-4">
                {/* 核心指标卡片 */}
                <MetricCards />
                
                {/* 表单创建趋势 */}
                <FormTrend />
                
                {/* 提交概览 */}
                <SubmissionOverview />
                
                {/* 热门表单 */}
                <ActiveForms />
                
                {/* 表单分布和时段统计 */}
                <FormDistribution />
            </div>
        </Scroll>
    );
}