'use client'

import React, { useEffect, useState } from "react";
import Scroll from "@/features/core/components/shared/scroll";
import MetricCards from "./metric-cards";
import FormTrend from "./form-trend";
import SubmissionOverview from "./submission-overview";
import ActiveForms from "./active-forms";
import FormDistribution from "./form-distribution";
import RecentActivities from "./recent-activities";
import { Card, CardBody } from "@heroui/react";
import Conditions from "./conditions";
import SubmissionDistribution from "./submission-distribution";
import { Statistic } from "@/features/dashboard/types/statistic";
import { SearchParams } from "@/features/dashboard/types/search-params";
import { getStatistic } from "@/features/dashboard/actions/dashoboard-actions";


export default function Index({ initialData }: { initialData: Statistic }) {
    const [data, setData] = useState<Statistic>(initialData);

    const [searchParams, setSearchParams] = useState<SearchParams>({
        type: "today",
    });

    useEffect(() => {
        getStatistic(searchParams.type).then((res) => {
            setData(res.data);
        });
    }, [searchParams]);

    return (
        <div className="grid grid-rows-[56px_1fr] gap-4 h-full">
            <Card className="h-full">
                <CardBody className="pt-3">
                    <Conditions searchParams={searchParams} setSearchParams={setSearchParams}/>
                </CardBody>
            </Card>
            <Scroll>
                <div className="space-y-4">
                    {/* 核心指标卡片 */}
                    <MetricCards data={data.figures} />

                    {/* 表单创建趋势和提交概览 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormTrend data={data.form_trends} />
                        <SubmissionOverview data={data.submission_overview} />
                    </div>

                    {/* 热门表单和最近活动 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <ActiveForms data={data.active_forms} />
                        <RecentActivities data={data.recent_activities} />
                    </div>

                    {/* 表单分布和时段统计 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <FormDistribution data={data.form_distribution} />
                        <SubmissionDistribution data={data.submission_distribution} />
                    </div>
                </div>
            </Scroll>
        </div>
    );
}