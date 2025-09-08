'use client '

import { Field } from "@/features/form/types/field";
import { ChangeEvent } from "react";
import { Checkbox } from "@heroui/react";
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";

interface FieldOption {
    val: string;
    selected: boolean;
}

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

        fields.forEach((item: Field) => {
            if (item.uuid == uuid && item.config.options !== undefined) {
                const options = item.config.options as FieldOption[];
                options.splice(index + 1, 0, {
                    val: "option",
                    selected: false,
                });

                setCurrentField({
                    ...currentField,
                    config: {
                        ...currentField.config,
                        options: options,
                    },
                });
            }
        });

        setFields(fields);

        console.log(currentField.config.options);
    };

    const handleOptionCheckClick = (key: number) => {
        const uuid = currentField.uuid;

        fields.forEach((item: Field) => {
            if (item.uuid == uuid && item.config.options !== undefined) {
                const options = item.config.options as FieldOption[];
                options.forEach((option, index) => {
                    if (index === key) {
                        options[index].selected = !options[index].selected;
                    }
                });

                setCurrentField({
                    ...currentField,
                    config: {
                        ...currentField.config,
                        options: options,
                    },
                });
            }
        });

        setFields(fields);

        console.log(currentField.config.options);
    };

    const handleOptionValChange = (
        key: number,
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const uuid = currentField.uuid;

        fields.forEach((item: Field) => {
            if (item.uuid == uuid && item.config.options !== undefined) {
                const options = item.config.options as FieldOption[];
                options.forEach((option, index) => {
                    if (index === key) {
                        options[index].val = e.target.value;
                    }
                });

                setCurrentField({
                    ...currentField,
                    config: {
                        ...currentField.config,
                        options: options,
                    },
                });
            }
        });

        setFields(fields);

        console.log(currentField.config.options);
    };

    const handleOptionRemoveClick = (key: number) => {
        const uuid = currentField.uuid;

        fields.forEach((item: Field) => {
            if (item.uuid == uuid && item.config.options !== undefined) {
                // remove option from options
                const options = item.config.options as FieldOption[];
                options.forEach((option, index) => {
                    if (index === key) {
                        options.splice(index, 1);
                    }
                });

                // setState
                setCurrentField({
                    ...currentField,
                    config: {
                        ...currentField.config,
                        options: options,
                    },
                });
                console.log("remove");
            }
        });

        setFields(fields);
    };


    return (
        <>
            {
                currentField.config.length !== 0 && (
                    <div className="grid grid-cols-1 gap-1">
                        <span className="text-xs font-semibold">Options</span>
                        <ul className="max-w-full grid grid-flow-row gap-1 bg-white">
                            {(currentField.config.options as FieldOption[] | undefined)?.map(
                                (option: FieldOption, index: number) => (
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