'use client'

import { Input, Textarea, Select, SelectItem, Switch, cn } from "@heroui/react";
import React from "react";
import { Form } from "@/features/form/types/form";
import { FormError } from "@/features/form/types/save/form-error";
import { useTranslations } from "next-intl";        
import ErrorMessage from "@/features/core/components/shared/error-message";

export default function FormSetting({ form, setForm, errors ,setErrors}: { form: Form, setForm: (form: Form) => void, errors: FormError, setErrors: (errors: FormError) => void }) {

    const t = useTranslations();

    const handleTitleChange = (e: any) => {
        setForm({ ...form, title: e.target.value });
    }

    const handleDescriptionChange = (e: any) => {
        setForm({ ...form, description: e.target.value });
    }

    const handleNumberingStyleChange = (e: any) => {
        setForm({ ...form, numbering_style: parseInt(e.target.value) });
    }

    const handleEnabledChange = (e: any) => {
        setForm({ ...form, enabled: e.target.checked });
    }

    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
            <Input
                label={t('form.title')}
                placeholder={t('form.please_enter')}
                type="text"
                size="sm"
                value={form.title}
                onChange={handleTitleChange}
                labelPlacement={"outside"}
                classNames={{
                    // 文字更深更粗：根据主题语义色或自定义颜色选择
                    label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                }}
                onFocus={() => setErrors({ ...errors, title: '' })}
                endContent={
                    errors.title && (
                        <ErrorMessage error={t(errors.title as any)} />
                    )
                }
                maxLength={255}
                isRequired
                validationBehavior="aria"
            />
            <Textarea
                label={t('form.description')}
                placeholder=""
                size="sm"
                value={form.description}
                onChange={handleDescriptionChange}
                labelPlacement={"outside"}
                classNames={{
                    // 文字更深更粗：根据主题语义色或自定义颜色选择
                    label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                }}
                onFocus={() => setErrors({ ...errors, description: '' })}
                endContent={
                    errors.description && (
                        <ErrorMessage error={t(errors.description as any)} />
                    )
                }
                maxLength={1000}
            />
            <Select
                label={t('form.numbering_style')}
                placeholder={t('form.please_select')}
                className="max-w-full"
                size="sm"
                selectedKeys={[form.numbering_style.toString()]}
                onChange={handleNumberingStyleChange}
                labelPlacement="outside"
                classNames={{
                    // 文字更深更粗：根据主题语义色或自定义颜色选择
                    label: "text-foreground font-semibold", // 或如 "text-zinc-800 dark:text-zinc-100 font-bold"
                }}
            >
                <SelectItem key={0}>
                    {t('form.numbering_none')}
                </SelectItem>
                <SelectItem key={1}>
                    {t('form.numbering_arabic')}
                </SelectItem>
            </Select>
            <div className="grid grid-cols-1 gap-1">
                <span className="text-xs font-semibold">{t('form.enabled_label')}</span>
                <Switch
                    classNames={{
                        base: cn(
                            "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                            "justify-between cursor-pointer rounded-lg gap-2 px-1 py-2 border-2 border-transparent ms-0 pl-0"
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
                    size="sm"
                    onChange={handleEnabledChange}
                    isSelected={form.enabled as boolean}
                >
                    <div className="flex flex-col gap-1">
                        <p className="text-tiny text-default-400 ms-0">{t('form.enabled_description')}</p>
                    </div>
                </Switch>
            </div>

        </div>
    )
}