'use client '

import { Field } from "@/features/form/types/field";
import { ChangeEvent } from "react";
import { Checkbox, Switch } from "@heroui/react";
import { cn, Input } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";
import { Option } from "@/features/form/types/config/option";
import _ from "lodash";


export default function Options({
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

    const handleOptionAddClick = (index: number) => {
        const uuid = currentField.uuid;

        const newFields = fields.map((item: Field) => {
            if (item.uuid === uuid && item.config.options !== undefined) {
                const options = _.cloneDeep(item.config.options.default_options) as Option[];
                options.splice(index + 1, 0, {
                    val: "option",
                    selected: false,
                });

                return {
                    ...item,
                    config: {
                        ...item.config,
                        options: {
                            ...item.config.options,
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

    };

    const handleOptionCheckClick = (key: number) => {
        const uuid = currentField.uuid;

        const newFields = fields.map((item: Field) => {
            if (item.uuid === uuid && item.config.options !== undefined) {
                const options = _.cloneDeep(item.config.options.default_options) as Option[];

                if (item.config.options?.multiple) {
                    options[key].selected = !options[key].selected;
                } else {
                    options.forEach((option, index) => {
                        option.selected = index === key;
                    });
                }

                return {
                    ...item,
                    config: {
                        ...item.config,
                        options: {
                            ...item.config.options,
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

        console.log(currentField.config.options);
    };

    const handleOptionValChange = (
        key: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const uuid = currentField.uuid;

        const newFields = fields.map((item: Field) => {
            if (item.uuid === uuid && item.config.options !== undefined) {
                const options = _.cloneDeep(item.config.options.default_options) as Option[];
                options[key].val = e.target.value;

                return {
                    ...item,
                    config: {
                        ...item.config,
                        options: {
                            ...item.config.options,
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

        console.log(currentField.config.options);
    };

    const handleOptionRemoveClick = (key: number) => {
        const uuid = currentField.uuid;

        const newFields = fields.map((item: Field) => {
            if (item.uuid === uuid && item.config.options !== undefined) {
                const options = _.cloneDeep(item.config.options.default_options) as Option[];
                options.splice(key, 1);

                return {
                    ...item,
                    config: {
                        ...item.config,
                        options: {
                            ...item.config.options,
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
        console.log("remove");
    };


    return (
        <>
            {
                currentField.config.options && (
                    <>
                        {!currentField.config.options.hide_multiple && (
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
                                    isSelected={currentField.config.options.multiple as boolean}
                                >
                                    <div className="flex flex-col gap-1">
                                        <p className="text-tiny text-default-400 ms-0">whether the field is multiple</p>
                                    </div>
                                </Switch>
                            </div>
                        )}
                        <div className="grid grid-cols-1 gap-1">
                            <span className="text-xs font-semibold">Options</span>
                            <ul className="max-w-full grid grid-flow-row gap-1 bg-white">
                                {(currentField.config.options.default_options as Option[] | undefined)?.map(
                                    (option: Option, index: number) => (
                                        <li
                                            className="max-w-full flex items-center gap-1 bg-content2 p-1 rounded-lg"
                                            key={index}
                                        >
                                            <Checkbox
                                                isSelected={option.selected}
                                                onChange={() => handleOptionCheckClick(index)}
                                                radius="full"
                                                className="flex-shrink-0"
                                            ></Checkbox>
                                            <Input
                                                size="sm"
                                                type="text"
                                                label=""
                                                maxLength={255}
                                                minLength={0}
                                                value={option.val}
                                                onChange={(e) => handleOptionValChange(index, e)}
                                                className="flex-grow min-w-0"
                                                classNames={{
                                                    input: "!bg-white",
                                                    inputWrapper: "!bg-white"
                                                }}
                                                variant="underlined"
                                            />
                                            <Button
                                                isIconOnly
                                                radius="full"
                                                size="sm"
                                                color="primary"
                                                aria-label="Plus"
                                                onClick={() => handleOptionAddClick(index)}
                                                variant="flat"
                                                className="flex-shrink-0"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </Button>
                                            <Button
                                                isIconOnly
                                                radius="full"
                                                size="sm"
                                                className={clsx("flex-shrink-0", {
                                                    invisible: index === 0,
                                                })}
                                                color="primary"
                                                aria-label="Minus"
                                                onClick={() => handleOptionRemoveClick(index)}
                                                variant="flat"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-4 h-4"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </Button>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </>

                )
            }
        </>
    )
}