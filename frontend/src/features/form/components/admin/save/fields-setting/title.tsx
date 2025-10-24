'use client'

import { Field } from "@/features/form/types/field";
import { Input } from "@heroui/react";
import { FieldError } from "@/features/form/types/save/field-error";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/features/core/components/shared/error-message";

export default function Title({
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

    const t = useTranslations();

    const handleTitleChange = (e: any) => {

        const title = e.target.value;

        setFields(fields.map(field => field.uuid === currentField.uuid ? 
            { 
                ...field, 
                title: title ,
                config: {
                    ...field.config,
                    title: title,
                }
            } : field));
    }

    return (
        <>
            {
                currentField.config.title !== undefined && (
                    <Input
                        label={t('form.field_title')}
                        placeholder={t('form.please_enter')}
                        type="text"
                        size="sm"
                        value={currentField.title}
                        onChange={handleTitleChange}
                        labelPlacement="outside"
                        classNames={{
                            // 文字更深更粗：根据主题语义色或自定义颜色选择
                            label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                        }}
                        onFocus={() => setFieldErrors({ ...errors, title: '' })}
                        endContent={
                            errors.title && (
                                <ErrorMessage error={t(errors.title as any)} />
                            )
                        }
                        isRequired
                        validationBehavior="aria"
                    />
                )
            }
        </>
    )
}
