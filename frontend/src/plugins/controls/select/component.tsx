'use client'

import { Field } from "@/features/form/types/field";
import { Select, SelectItem } from "@heroui/react";
import { Option } from "@/features/form/types/config/option";


export default function SelectComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {

    const selectionMode = field.config.options?.multiple ? "multiple" : "single";

    return (
        <Select
            placeholder={field.title}
            size="sm"
            selectedKeys={value}
            onSelectionChange={(keys) => {
                if (keys === "all") {
                    // handle all selected
                    return;
                }
                const selectedKeys = [...keys]; // convert to array
                setValue(selectedKeys);
            }}
            selectionMode={selectionMode}
        >
            {field.config.options?.default_options?.map((option: Option, index: number) => (
                <SelectItem key={option.val} textValue={option.val}>{option.val}</SelectItem>
            )) || []}
        </Select>
    )
}