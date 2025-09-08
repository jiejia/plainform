'use client'

import { Field } from "@/features/form/types/field";
import { Input } from "@heroui/react";


export default function Title({
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

    const handleTitleChange = (e: any) => {

        const title = e.target.value;

        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, title: title } : field));

        setCurrentField({ ...currentField, title: title });
    }

    return (
        <>
            {
                currentField.config.title !== undefined && (
                    <Input
                        label="Title"
                        placeholder="Please enter"
                        type="text"
                        isRequired
                        size="sm"
                        value={currentField.title}
                        onChange={handleTitleChange}
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
