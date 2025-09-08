'use client'

import { Field } from "@/features/form/types/field"
import { Slider } from "@heroui/react";


export default function Rows({
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

    const handleRowsChange = (value: number | number[]) => {
        const uuid = currentField.uuid;
        const numValue = Array.isArray(value) ? value[0] : value;
    
        fields.forEach((item: Field) => {
          if (item.uuid == uuid) {
            item.config.rows = numValue;
          }
        });
    
        setFields(fields);
    
        setCurrentField({
          ...currentField,
          config: {
            ...currentField.config,
            rows: numValue,
          },
        });
    }

    return (
        <>
            {currentField.config.rows !== undefined ? (
                <Slider
                    label="Rows"
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