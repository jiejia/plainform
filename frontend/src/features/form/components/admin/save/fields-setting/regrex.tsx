'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function Regrex({
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

    const handleRegrexChange = (e: any) => {
        const regex = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, regex: regex } : field));
        setCurrentField({ ...currentField, regex: regex });
    }
    return (
        <>
            {
                currentField.config.regex !== undefined && (
                    <Input
                        label="Regrex"
                        placeholder="enter regrex"
                        type="text"
                        size="sm"
                        value={currentField.regex}
                        onChange={handleRegrexChange}
                    />
                )
            }
        </>
    )
}