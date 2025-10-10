'use client'

import React, { useState } from "react";
import { Button, ButtonGroup} from "@heroui/react";
import { ListFilterPlus } from "lucide-react";

export default function Conditions() {
    const [selectedRange, setSelectedRange] = useState("1");

    const ranges = [
        { key: "1", label: "今天" },
        { key: "7", label: "7天" },
        { key: "30", label: "一月" },
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
                            color={selectedRange === range.key ? "primary" : "default"}
                            variant={selectedRange === range.key ? "solid" : "flat"}
                            onPress={() => setSelectedRange(range.key)}
                        >
                            {range.label}
                        </Button>
                    ))}
                </ButtonGroup>
            </div>
        </div>

    )
}