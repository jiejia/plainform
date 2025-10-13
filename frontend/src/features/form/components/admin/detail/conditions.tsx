'use client'

import React from "react";
import { Button, ButtonGroup, Select, SelectItem } from "@heroui/react";
import { ListFilterPlus } from "lucide-react";
import { SearchParams } from "@/features/form/types/detail/search-params";


export default function Conditions({ searchParams, setSearchParams, versions }: { searchParams: SearchParams, setSearchParams: (searchParams: SearchParams) => void, versions: number[] }) {

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
                {versions.length > 0 && (
                    <Select
                        isRequired
                        className="w-24"
                        defaultSelectedKeys={[searchParams.version?.toString() || '']}
                        placeholder="选择版本"
                        size="sm"
                        onSelectionChange={(e) => setSearchParams({ ...searchParams, version: parseInt(e.currentKey || '') })}
                    >
                        {versions.map((version) => (
                            <SelectItem key={version.toString()} textValue={"版本" + version.toString()}>版本{version}</SelectItem>
                        ))}
                    </Select>
                )}
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