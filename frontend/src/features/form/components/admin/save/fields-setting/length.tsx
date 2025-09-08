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

    const handleLengthChange = (value: number | number[]) => {
        const uuid = currentField.uuid;
        const [min, max] = Array.isArray(value) ? value : [value, value];
    
        fields.forEach((item: Field) => {
          if (item.uuid == uuid) {
            item.config.length = [min, max];
          }
        });
    
        setFields(fields);
    
        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            length: [min, max],
          },
        });
    }

    return (
        <>
            {
                currentField.config.length !== null && currentField.config.length !== undefined && (
                    <Slider
                        classNames={{
                            base: "w-full px-1", // 确保基础容器有足够宽度，添加一点内边距
                            track: "w-full", // 确保轨道占满宽度
                            filler: "w-full", // 确保填充器占满宽度
                            labelWrapper: "w-full", // 确保标签容器占满宽度
                            label: "text-xs font-semibold"
                        }}
                        label="Length Range"
                        maxValue={1000}
                        minValue={0}
                        step={1}
                        value={[currentField.config.length[0] as number, currentField.config.length[1] as number]}
                        onChange={handleLengthChange}
                    />
                )
            }
        </>
    )
}