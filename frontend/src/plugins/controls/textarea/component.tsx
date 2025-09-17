'use client'

import { Field } from "@/features/form/types/field";
import { Textarea } from "@heroui/react";

export default function TextareaComponent({ field }: { field: Field }) {
    return (
        <Textarea 
            // label={field.title}
            value={field.config.default_value as string}
            onChange={(e) => {
                field.config.default_value = e.target.value;
            }}
            size="sm"
        />
    )
}