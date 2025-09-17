'use client'

import { RadioGroup, Radio } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";

export default function RadioComponent({ field }: { field: Field }) {
    return (
        <RadioGroup
            defaultValue={field.config.options?.default_options[0].val}
            // label={field.title}
            size="sm"
        >
            {field.config.options?.default_options.map((option: Option, index: number) => (
                <Radio key={index} value={option.val}>{option.val}</Radio>  
            ))}
        </RadioGroup>
    )
}