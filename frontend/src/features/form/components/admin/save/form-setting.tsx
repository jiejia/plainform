'use client'

import { Input, Textarea, Select, SelectItem, Switch, cn } from "@heroui/react";
import React from "react";
import { Form } from "@/features/form/types/form";

export default function FormSetting({ form, setForm }: { form: Form, setForm: (form: Form) => void }) {

    const handleTitleChange = (e: any) => {
        setForm({ ...form, title: e.target.value });
    }
    
    const handleDescriptionChange = (e: any) => {
        setForm({ ...form, description: e.target.value });
    }

    const handleNumberingStyleChange = (e: any) => {
        setForm({ ...form, numbering_style: parseInt(e.target.value) });
    }

    const handleEnabledChange = (e: any) => {
        setForm({ ...form, enabled: e });
    }

    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
            <Input label="Title" placeholder="Enter form title" type="text" isRequired size="sm" value={form.title} onChange={handleTitleChange} />
            <Textarea label="Description" placeholder="Enter form description" value={form.description} onChange={handleDescriptionChange} />
            <Select
                label="Sequential numbering style"
                placeholder=""
                className="max-w-full"
                selectedKeys={[form.numbering_style]}
                onChange={handleNumberingStyleChange}
            >
                <SelectItem key={0}>
                    None
                </SelectItem>
                <SelectItem key={1}>
                    Arabic numerals
                </SelectItem>
            </Select>
            <Switch
                isSelected={form.enabled}
                onChange={handleEnabledChange}
                classNames={{
                    base: cn(
                        "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                        "justify-between cursor-pointer rounded-lg gap-2 px-1 py-4 border-2 border-transparent"
                    ),
                    wrapper: "p-0 h-4 overflow-visible",
                    thumb: cn(
                        "w-6 h-6 border-2 shadow-lg",
                        "group-data-[hover=true]:border-primary",
                        //selected
                        "group-data-[selected=true]:ml-6",
                        // pressed
                        "group-data-[pressed=true]:w-7",
                        "group-data-[selected]:group-data-[pressed]:ml-4"
                    )
                }}
                size="md"
            >
                <div className="flex flex-col gap-1">
                    <p className="text-tiny text-default-600">Required</p>
                </div>
            </Switch>
        </div>
    )
}