'use client'

import React from "react";
import {
    Select,
    SelectItem,
    Pagination,
} from "@heroui/react";

export default function Pagenate() {
    return (
        <>
            <div className="hidden sm:block justify-items-center content-center">
                Total 10
            </div>
            <div className="justify-items-center content-center">
                <Pagination
                    showControls
                    showShadow
                    color="primary"
                    page={10}
                    total={10}
                    size={"sm"}
                />
            </div>
            <div className="hidden sm:block justify-items-center content-center">
                <Select
                    disallowEmptySelection
                    selectionMode="single"
                    className="max-w-xs"
                    size="sm"

                >
                    {[20, 30, 50, 100].map((size) => (<SelectItem key={size} textValue={size.toString()}>
                        {size}
                    </SelectItem>))}
                </Select>
            </div>
        </>
    );
}