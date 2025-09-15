'use client'

import { cn, Switch } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";

export default function SwitchDefaultValue({
    fields,
    setFields,
    currentField,
    errors,
    setFieldErrors
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    errors: FieldError,
    setFieldErrors: (errors: FieldError) => void
}) {

    const handleDefaultValueChange = (e: any) => {
        const switch_default_value = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, config: { ...field.config, switch_default_value: switch_default_value } } : field));
    }

    return (
        <>
            {
                currentField.config.switch_default_value !== undefined && (
                    <div className="grid grid-cols-1 gap-1">
                        <span className="text-xs font-semibold">Switch Default Value</span>
                        <Switch
                            classNames={{
                                base: cn(
                                    "inline-flex flex-row-reverse w-full max-w-full bg-content2 hover:bg-content2 items-center",
                                    "justify-between cursor-pointer rounded-lg gap-2 px-1 py-2 border-2 border-transparent ms-0 pl-0"
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
                            size="sm"
                            onChange={handleDefaultValueChange}
                            checked={currentField.config.switch_default_value as boolean}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-tiny text-default-400 ms-0">switch default value</p>
                            </div>
                        </Switch>
                    </div>
                )
            }
        </>
    )
}