'use client'

import { Input } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function Description({
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

    const handleDescriptionChange = (e: any) => {

        const description = e.target.value;

        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, description: description } : field));

        setCurrentField({ ...currentField, description: description });
    }
    return (
        <>
            {
                currentField.config.description !== undefined && (
                    <Input
                        label="Description"
                        placeholder="enter description"
                        type="text"
                        size="sm"
                        value={currentField.description}
                        onChange={handleDescriptionChange}
                    />
                )
            }
        </>
    )
}