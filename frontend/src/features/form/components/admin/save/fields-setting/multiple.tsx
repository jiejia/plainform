'use client'

import { cn, form, Switch } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { Option } from "@/features/form/types/config/option";
import _ from "lodash";

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
        const uuid = currentField.uuid;

        const newFields = fields.map((item: Field) => {
            if (item.uuid === uuid && item.config.options !== undefined) {
                const options = _.cloneDeep(item.config.options.default_options) as Option[];
                const firstIndex = options.findIndex((option: Option) => option.selected);

                if (multiple === false) {
                    // 如果设置为非多选，清除所有选中状态，然后只选中第一个
                    options.forEach((option: Option, index: number) => {
                        option.selected = index === firstIndex && firstIndex !== -1;
                    });
                }

                return {
                    ...item,
                    config: {
                        ...item.config,
                        multiple: multiple,
                        options: {
                            ...item.config.options,
                            multiple: multiple,
                            default_options: options,
                        },
                    },
                };
            }
            return item;
        });

        const updatedCurrentField = newFields.find(field => field.uuid === uuid);
        if (updatedCurrentField) {
            setCurrentField(updatedCurrentField);
        }

        setFields(newFields);
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