'use client'

import React from "react";
import { Card, CardBody } from "@heroui/react";
import Conditions from "./conditions";
import Scroll from "@/features/core/components/shared/scroll";
import MetricCards from "./metric-cards";
import SubmissionTrend from "./submission-trend";
import TimeHeatmap from "./time-heatmap";
import { Statistic } from "@/features/form/types/statistic";
import GeoLocationDistribution from "./geo-location-distribution";
import SubmissionPeriod from "./submission-period";
import { statistics as getStatistics } from "@/features/form/actions/admin/form-action";
import { useState, useEffect } from "react";
import { SearchParams } from "@/features/form/types/detail/search-params";

export default function Index({ initialData, formId, versions }: { initialData: Statistic, formId: number, versions: number[] }) {

    const [data, setData] = useState<Statistic>(initialData);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        type: "today",
        version: versions[0],
    });

    useEffect(() => {
        getStatistics(formId, searchParams.version, searchParams.type).then((res) => {
            if (res.code === 0) {
                console.log("res.data", res.data);
                setData(res.data);
            }
        });
    }, [formId, searchParams]);

    return (
        <div className="grid grid-rows-[56px_1fr] gap-4 h-full">
            <Card className="h-full">
                <CardBody className="pt-3">
                    <Conditions searchParams={searchParams} setSearchParams={setSearchParams} versions={versions} />
                </CardBody>
            </Card>
            <Scroll>
                <div className="space-y-4">
                    {/* 核心指标卡片 */}
                    <MetricCards data={data.figures} />
                    
                    {/* 提交趋势图和提交时段热力图 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <SubmissionTrend /> 
                        <TimeHeatmap />
                    </div>
                    
                    {/* 其他统计 */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <GeoLocationDistribution />
                        <SubmissionPeriod />
                    </div>
                </div>
            </Scroll>
        </div>
    )
}