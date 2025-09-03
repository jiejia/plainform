'use client'

import { Input, Textarea, Select, SelectItem, Switch, cn } from "@heroui/react";
import React from "react";

export default function FormSetting() {
    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
        <Input label="Title" placeholder="Enter form title" type="text" isRequired size="sm"/>
        <Textarea label="Description" placeholder="Enter form description" />
        <Select
            label="Sequential numbering style"
            placeholder=""
            className="max-w-full"
            selectedKeys={[0]}
        >
            <SelectItem key={0}>
                None
            </SelectItem>
            <SelectItem key={1}>
                Arabic numerals
            </SelectItem>
        </Select>
        <Switch
            classNames={{
                base: cn(
                    "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 px-1 py-4 border-2 border-transparent"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                    "w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4"
                )
            }}
            size="md"
        >
            <div className="flex flex-col gap-1">
                <p className="text-tiny text-default-600">Required</p>
            </div>
        </Switch>
    </div>
    )
}