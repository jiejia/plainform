'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function Regrex({
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

    const handleRegrexChange = (e: any) => {
        const regex = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, regex: regex } : field));
        setCurrentField({ ...currentField, regex: regex });
    }
    return (
        <>
            {
                currentField.config.regex !== undefined && (
                    <Input
                        label="Regrex"
                        placeholder="Please enter"
                        type="text"
                        size="sm"
                        value={currentField.regex}
                        onChange={handleRegrexChange}
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