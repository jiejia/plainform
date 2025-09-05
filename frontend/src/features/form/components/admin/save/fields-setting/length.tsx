'use client '

import { Slider } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function Length({
    fields,
    setFields,
    currentField,
    setCurrentField
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    setCurrentField: (field: Field) => void
}) {
    return (
        <>
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
        </>
    )
}