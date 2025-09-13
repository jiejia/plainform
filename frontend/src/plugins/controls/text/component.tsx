'use client'

import { Field } from "@/features/form/types/field";
import { Input } from "@heroui/react";

export default function TextComponent({ field }: { field: Field }) {
    return (
        <Input label={field.title}
            value={field.config.default_value as string}
            onChange={(e) => {
                field.config.default_value = e.target.value;
            }}
        />
    )
}