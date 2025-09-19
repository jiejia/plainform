'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";

export default function Regrex({
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

    const handleRegrexChange = (e: any) => {
        const regex = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, regex: regex, config: { ...field.config, regex: regex } } : field));
    }
    return (
        <>
            {
                currentField.config.regex.hidden === false && (
                    <Input
                        label="Regrex"
                        placeholder="Please enter"
                        type="text"
                        size="sm"
                        value={currentField.config.regex.value}
                        onChange={handleRegrexChange}
                        labelPlacement="outside"
                        classNames={{
                            // 文字更深更粗：根据主题语义色或自定义颜色选择
                            label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                        }}
                        onFocus={() => setFieldErrors({ ...errors, regex: '' })}
                        endContent={
                            errors.regex && (
                                <span className="text-danger-500 text-xs bg-white px-2 py-1 rounded-md whitespace-nowrap shrink-0">
                                    {errors.regex}
                                </span>
                            )
                        }
                    />
                )
            }
        </>
    )
}