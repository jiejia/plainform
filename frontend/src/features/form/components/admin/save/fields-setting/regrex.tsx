'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";
import { Select, SelectItem } from "@heroui/react";
import { useTranslations } from 'next-intl';
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

    const t = useTranslations('form');
    const handleRegrexChange = (e: any) => {
        const regex = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, regex: regex, config: { ...field.config, regex: { ...field.config.regex, value: regex } } } : field));
    }


    const handleRulesChange = (e: any) => {
        const regex = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, regex: regex, config: { ...field.config, regex: { ...field.config.regex, value: regex } } } : field));
    }

    return (
        <>
            {
                currentField.config.regex.hidden === false && (
                    <>
                        <Input
                            label={t('field_regex')}
                            placeholder={t('please_enter')}
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
                                        {t(errors.regex)}
                                    </span>
                                )
                            }
                        />
                        {
                            currentField.config.regex.avaliable_rules && (
                                <Select
                                    className="max-w-xs"
                                    items={[
                                        { name: t('custom_regex'), value: "" },
                                        ...currentField.config.regex.avaliable_rules
                                    ]}                                    labelPlacement="outside"
                                    size="sm"
                                    placeholder={t('available_regex')}
                                    onChange={handleRulesChange}
                                >

                                    {(rule) => <SelectItem key={rule.value} textValue={rule.name}>{rule.name}</SelectItem>}
                                </Select>
                            )
                        }
                    </>
                )
            }
        </>
    )
}