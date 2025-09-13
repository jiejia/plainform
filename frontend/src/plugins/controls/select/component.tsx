'use client'

import { Field } from "@/features/form/types/field";
import { Select, SelectItem } from "@heroui/react";
import { Option } from "@/features/form/types/config/option";


export default function SelectComponent({ field }: { field: Field }) {
    return (
        <Select label={field.title}>
            {field.config.options?.default_options?.map((option: Option) => (
                <SelectItem key={option.val}>{option.val}</SelectItem>
            )) || []}
        </Select>
    )
}