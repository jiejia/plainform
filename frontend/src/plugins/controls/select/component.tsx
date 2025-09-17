'use client'

import { Field } from "@/features/form/types/field";
import { Select, SelectItem } from "@heroui/react";
import { Option } from "@/features/form/types/config/option";


export default function SelectComponent({ field }: { field: Field }) {
    const selectedKeys =
        field.config.options?.default_options
            ?.filter((option: Option) => option.selected)
            .map((option: Option) => option.val) || [];

            // console.log("selectedKeys", selectedKeys);

    return (
        <Select
            placeholder={field.title}
            size="sm"
            selectedKeys={selectedKeys}
        >
            {field.config.options?.default_options?.map((option: Option, index: number) => (
                <SelectItem key={option.val} textValue={option.val}>{option.val}</SelectItem>
            )) || []}
        </Select>
    )
}