'use client'

import { Field } from "@/features/form/types/field"
import { Slider } from "@heroui/react";
import { FieldError } from "@/features/form/types/save/field-error";
import { useTranslations } from 'next-intl';

export default function Rows({
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
    const handleRowsChange = (value: number | number[]) => {
        const uuid = currentField.uuid;
        const numValue = Array.isArray(value) ? value[0] : value;
    
        fields.forEach((item: Field) => {
          if (item.uuid == uuid) {
            item.config.rows = numValue;
          }
        });
    
        setFields(fields);
    
    }

    return (
        <>
            {currentField.config.rows !== undefined ? (
                <Slider
                    label={t('rows')}
                    step={1}
                    maxValue={255}
                    minValue={0}
                    onChange={handleRowsChange}
                    value={currentField.config.rows}
                    className="max-w-full overflow-hidden"
                    classNames={{
                        label: "text-xs font-semibold",
                        value: "text-tiny text-default-600",
                    }}
                    size="md"
                    showSteps={false}
                />
            ) : (
                <></>
            )}
        </>
    )
}