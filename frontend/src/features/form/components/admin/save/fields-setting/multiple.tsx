'use client'

import { cn, form, Switch } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";

export default function Multiple({
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

    const handleMultipleChange = (e: any) => {
        const multiple = e.target.checked;
        fields.forEach((item: Field) => {
            if (item.uuid == currentField.uuid && item.config.options !== undefined) {
                item.config.options.multiple = multiple;
                const firstIndex = item.config.options.default_options.findIndex((option: Option) => option.selected);

                item.config.options.default_options.forEach((option: Option, index: number) => {
                    if (multiple == false) {
                        if (option.selected) {
                            option.selected = false;
                        }
                    }
                });
                // only first option is selected
                item.config.options.default_options.forEach((option: Option, index: number) => {
                    if (index == firstIndex) {
                        option.selected = true;
                    }
                })
            }
        });
        setFields(fields);
        setCurrentField({ ...currentField, config: { ...currentField.config, multiple: multiple } });
    }
    return (
        <>
            {
                currentField.config.multiple !== undefined && (
                    <div className="grid grid-cols-1 gap-1">
                        <span className="text-xs font-semibold">Multiple</span>
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
                            onChange={handleMultipleChange}
                            isSelected={currentField.config.multiple as boolean}
                        >
                            <div className="flex flex-col gap-1">
                                <p className="text-tiny text-default-400 ms-0">whether the field is multiple</p>
                            </div>
                        </Switch>
                    </div>
                )
            }
        </>
    )
}