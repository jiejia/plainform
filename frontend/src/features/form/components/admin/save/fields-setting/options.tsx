'use client '

import { Field } from "@/features/form/types/field";
import { ChangeEvent } from "react";
import { Checkbox } from "@heroui/react";
import { Input } from "@heroui/react";
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
                )
            }
        </>
    )
}