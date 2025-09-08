'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function DefaultValue({
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

    const handleDefaultValueChange = (e: any) => {
        const default_value = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, config: { ...field.config, default_value: default_value } } : field));
        setCurrentField({ ...currentField, config: { ...currentField.config, default_value: default_value } });
    }

    return (
        <>
            {
                currentField.config.default_value !== undefined && (
                    <Input
                        label="Default Value"
                        placeholder="Please enter"
                        type="text"
                        size="sm"
                        value={currentField.config.default_value as string}
                        onChange={handleDefaultValueChange}
                        labelPlacement="outside"
                        classNames={{
                            // 文字更深更粗：根据主题语义色或自定义颜色选择
                            label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                        }}
                    />
                )
            }
        </>
    )
}