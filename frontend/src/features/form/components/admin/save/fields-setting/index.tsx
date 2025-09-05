'use client'

import { SelectItem, Switch } from "@heroui/react";
import { Input, Select, cn } from "@heroui/react";
import { Slider } from "@heroui/react";
import React from "react";
import OptionsControl from "./options";
import { Field } from "@/features/form/types/field";


export default function Index({
    fields,
    setFields,
    currentField,
    setCurrentField
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field | null,
    setCurrentField: (field: Field) => void
}) {

    console.log("currentField", currentField);
    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
            {
                currentField && (
                    <>
                        {
                            currentField.config.title !== undefined && (
                                <Input label="Title" placeholder="enter title" type="text" isRequired size="sm" />
                            )
                        }
                        {
                            currentField.config.description !== undefined && (
                                <Input label="Description" placeholder="enter description" type="text" size="sm" />
                            )
                        }
                        {
                            currentField.config.regex !== undefined && (
                                <Input label="Regrex" placeholder="enter regrex" type="text" size="sm" />
                            )
                        }
                        {
                            currentField.config.datetime_format !== undefined && (
                                <Select label="Date Format" placeholder="" className="max-w-full" selectedKeys={[0]}>
                                    <SelectItem key={0}>None</SelectItem>
                                    <SelectItem key={1}>Arabic numerals</SelectItem>
                                </Select>
                            )
                        }
                        {
                            currentField.config.required !== undefined && (
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
                            )
                        }
                        {
                            currentField.config.length !== undefined && (
                                <Slider
                                    classNames={{
                                        base: "w-full px-1", // 确保基础容器有足够宽度，添加一点内边距
                                        track: "w-full", // 确保轨道占满宽度
                                        filler: "w-full", // 确保填充器占满宽度
                                        labelWrapper: "w-full" // 确保标签容器占满宽度
                                    }}
                                    label="Length Range"
                                    maxValue={255}
                                    minValue={1}
                                    step={10}
                                    value={10}
                                />
                            )
                        }

                        {
                            currentField.config.default_value !== undefined && (
                                <Input label="Default Value" placeholder="enter default value" type="text" size="sm" />
                            )
                        }

                        {
                            currentField.config.options !== undefined && (
                                <OptionsControl
                                    label="Options"
                                    className="w-full"
                                />
                            )
                        }
                    </>
                )
            }

        </div>
    )
}