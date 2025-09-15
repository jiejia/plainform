'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";

export default function Description({
    fields,
    setFields,
    currentField,
    errors,
    setFieldErrors
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    errors: FieldError,
    setFieldErrors: (errors: FieldError) => void
}) {

    const handleDescriptionChange = (e: any) => {

        const description = e.target.value;

        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, description: description, config: { ...field.config, description: description } } : field));

    }
    return (
        <>
            {
                currentField.config.description !== undefined && (
                    <Input
                        label="Description"
                        placeholder="Please enter"
                        type="text"
                        size="sm"
                        value={currentField.description}
                        onChange={handleDescriptionChange}
                        labelPlacement="outside"
                        classNames={{
                            // 文字更深更粗：根据主题语义色或自定义颜色选择
                            label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                        }}
                        onFocus={() => setFieldErrors({ ...errors, description: '' })}
                        endContent={
                            errors.description && (
                                <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                    {errors.description}
                                </span>
                            )
                        }
                    />
                )
            }
        </>
    )
}