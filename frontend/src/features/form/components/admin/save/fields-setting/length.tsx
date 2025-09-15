'use client '

import { Slider } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";

export default function Length({
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

    const handleLengthChange = (value: number | number[]) => {
        const uuid = currentField.uuid;
        const [min, max] = Array.isArray(value) ? value : [value, value];
    
        fields.forEach((item: Field) => {
          if (item.uuid == uuid) {
            item.config.length = [min, max];
          }
        });
    
        setFields(fields);

    }

    return (
        <>
            {
                currentField.config.length !== null && currentField.config.length !== undefined && (
                    <Slider
                        classNames={{
                            base: "w-full px-1", 
                            track: "w-full",    
                            filler: "w-full",
                            labelWrapper: "w-full",
                            label: "text-xs font-semibold"
                        }}
                        label="Length Range"
                        maxValue={1000}
                        minValue={0}
                        step={1}
                        value={[currentField.config.length[0] as number, currentField.config.length[1] as number]}
                        onChange={handleLengthChange}
                    />
                )
            }
        </>
    )
}