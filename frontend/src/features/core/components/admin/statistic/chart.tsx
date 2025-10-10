'use client'

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

export default function Chart({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between w-full">
                    <div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="pt-0 flex-1 min-h-0 overflow-hidden">
                <div className="w-full h-full">
                        {children as React.ReactElement}
                </div>
            </CardBody>
        </Card>
    )
}