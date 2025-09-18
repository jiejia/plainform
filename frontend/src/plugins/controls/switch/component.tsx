'use client'

import { Field } from "@/features/form/types/field";
import { Switch } from "@heroui/react";

export default function SwitchComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {
    return (
        <Switch
            // aria-label={field.title}
            checked={value}
            size="sm"
            onChange={(e) => {
                // console.log("switch change", e.target.checked);
                setValue(e.target.checked);
            }}
        />
    )
}