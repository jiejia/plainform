'use client'

import { Field } from "@/features/form/types/field";
import { Input } from "@heroui/react";

export default function TextComponent({ field,value,setValue }: { field: Field,value:any,setValue: (value:any) => void }) {
    return (
        <Input
            // label={field.title}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            size="sm"
        />
    )
}