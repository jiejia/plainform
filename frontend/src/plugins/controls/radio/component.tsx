'use client'

import { RadioGroup, Radio } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";

export default function RadioComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {
    return (
        <RadioGroup
            defaultValue={value}
            onValueChange={(e) => {
                console.log("radio change", e);
                setValue(e);
            }}
            size="sm"
        >
            {field.config.options?.default_options.map((option: Option, index: number) => (
                <Radio key={index} value={option.val}>{option.val}</Radio>  
            ))}
        </RadioGroup>
    )
}