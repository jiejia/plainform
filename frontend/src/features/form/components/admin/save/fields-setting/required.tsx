'use client'

import { cn, Switch } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function Required({
    fields,
    setFields,
    currentField,
    setCurrentField
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    setCurrentField: (field: Field) => void
}) {

    const handleRequiredChange = (e: any) => {
        const required = e.target.checked;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, required: required } : field));
        setCurrentField({ ...currentField, required: required });
    }
    return (
        <>
            {
                currentField.config.required !== undefined && (
                    <Switch
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
                        onChange={handleRequiredChange}
                        checked={currentField.required}
                    >
                        <div className="flex flex-col gap-1">
                            <p className="text-tiny text-default-600">Required</p>
                        </div>
                    </Switch>
                )
            }
        </>
    )
}