'use client'

import { CheckboxGroup, Checkbox } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";


export default function CheckboxComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {
    return (
        <CheckboxGroup
            value={value}
            size="sm"
            onChange={(e) => {
                // console.log("checkbox change", e);
                setValue(e);
            }}
        >
            {field.config.options?.default_options.map((option: Option, index: number) => (
                <Checkbox key={index} value={option.val}>{option.val}</Checkbox>
            ))}
        </CheckboxGroup>
    )
}