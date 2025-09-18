'use client'

import { Field } from "@/features/form/types/field";
import { Textarea } from "@heroui/react";

export default function TextareaComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {
    return (
        <Textarea 
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            size="sm"
            maxLength={field.config.length?.[1] as number}
            minLength={field.config.length?.[0] as number}
            minRows={field.config.rows as number}
        />
    )
}