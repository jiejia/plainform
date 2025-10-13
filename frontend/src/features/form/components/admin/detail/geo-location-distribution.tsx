'use client'

import React from "react";
import Chart from "@/features/core/components/admin/statistic/chart";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { GeoLocationDistribution as GeoLocationDistributionType } from "@/features/form/types/statistic";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function GeoLocationDistribution( { data }: { data: GeoLocationDistributionType[] } ) {
    // IP地理位置分布
    const locationData = data;

    return (
            <Chart title="地理位置分布 (Top 7)">
                <div className="space-y-3">
                    {locationData.map((location, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-sm font-medium text-gray-500 w-6">
                                    #{index + 1}
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                    {location.city}
                                </span>
                                <div className="flex-1 mx-4">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                            style={{ width: `${location.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-lg font-bold text-gray-900">
                                    {location.count}
                                </span>
                                <span className="text-xs text-gray-500 mb-0.5">
                                    {location.percentage}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Chart>
    );
}

