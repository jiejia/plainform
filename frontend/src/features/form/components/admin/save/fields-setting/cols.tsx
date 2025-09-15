'use client'

import { Field } from "@/features/form/types/field"
import { Slider } from "@heroui/react";
import { FieldError } from "@/features/form/types/save/field-error";


export default function Cols({
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

    const handleColsChange = (value: number | number[]) => {
        const uuid = currentField.uuid;
        const numValue = Array.isArray(value) ? value[0] : value;

        fields.forEach((item: Field) => {
            if (item.uuid == uuid) {
                item.config.cols = numValue;
            }
        });

        setFields(fields);
    }

    return (
        <>
            {currentField.config.cols !== undefined ? (
                <Slider
                    label="Cols"
                    step={1}
                    maxValue={255}
                    minValue={0}
                    onChange={handleColsChange}
                    value={currentField.config.cols}
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