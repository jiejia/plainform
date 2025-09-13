'use client'

import { Field } from "@/features/form/types/field";
import { Switch } from "@heroui/react";

export default function SwitchComponent({ field }: { field: Field }) {
    return (
        <Switch
            aria-label={field.title}
            checked={field.config.switch_default_value as boolean}
            size="sm"
            onChange={(e) => {
                field.config.switch_default_value = e.target.checked;
            }}
        />
    )
}