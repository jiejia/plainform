'use client'

import React, { useState } from "react";
import { Button, ButtonGroup} from "@heroui/react";
import { ListFilterPlus } from "lucide-react";
import { SearchParams } from "@/features/dashboard/types/search-params";

export default function Conditions({ searchParams, setSearchParams }: { searchParams: SearchParams, setSearchParams: (params: SearchParams) => void }) {

    const ranges = [
        { key: "today", label: "今天" },
        { key: "week", label: "7天" },
        { key: "month", label: "一月" },
        { key: "all", label: "所有" },
    ];

    return (
        <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <div className="text-xs font-medium">
                <ListFilterPlus className="w-4 h-4" />
            </div>
            <div className="grid grid-flow-col items-center gap-4 justify-end">
                <ButtonGroup size="sm" variant="flat">
                    {ranges.map((range) => (
                        <Button
                            key={range.key}
                            color={searchParams.type === range.key ? "primary" : "default"}
                            variant={searchParams.type === range.key ? "solid" : "flat"}
                            onPress={() => setSearchParams({ ...searchParams, type: range.key })}
                        >
                            {range.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>

    )
}