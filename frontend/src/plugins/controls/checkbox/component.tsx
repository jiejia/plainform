'use client'

import { CheckboxGroup, Checkbox } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";


export default function CheckboxComponent({ field }: { field: Field }) {
    return (
        <CheckboxGroup defaultValue={field.config.options?.default_options.map((option: Option) => option.val)} label={field.title}>
            {field.config.options?.default_options.map((option: Option) => (
                <Checkbox value={option.val}>{option.val}</Checkbox>
            ))}
        </CheckboxGroup>
    )
}