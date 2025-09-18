'use client'

import { Form as FormType } from "@/features/form/types/form";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import Copyright from "@/features/core/components/admin/copyright";
import { useState, useEffect } from "react";

interface FieldItemProps {
    field: Field;
    onChange: (uuid: string, value: unknown) => void;
}

function FieldItem({ field, onChange }: FieldItemProps) {
    const [value, setValue] = useState(field.config.default_value);

    const handleChange = (v: unknown) => {
        setValue(v);
        onChange(field.uuid, v);
    };

    return (
        <>
            {field.component &&
                <field.component
                    field={field}
                    value={value}
                    setValue={handleChange}
                />
            }
        </>
    );
}


export default function Detail({ form }: { form: FormType }) {

    const [formData, setFormData] = useState<Array<{
        uuid: string;
        title: string;
        value: unknown;
    }>>([]);

    const handleFieldChange = (uuid: string, value: unknown) => {
        setFormData(prev => {
            const existingIndex = prev.findIndex(item => item.uuid === uuid);
            const field = form.fields?.find(f => f.uuid === uuid);
            
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    value
                };
                return updated;
            } else {
                return [...prev, {
                    uuid,
                    title: field?.title || '',
                    value
                }];
            }
        });
    };

    const handleSubmit = () => {
        console.log(formData);
    };
    
    useEffect(() => {
        if (form.fields) {
            const initialData = form.fields.map((field: Field) => ({
                uuid: field.uuid,
                title: field.title,
                value: field.config.default_value
            }));
            console.log("initialData", initialData);
            setFormData(initialData);
        }
    }, [form.fields]);


    return (
        <div className="py-4 px-4 min-h-screen">
            <Card className="h-full mx-auto max-w-5xl mt-2">
                <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{form.title}</h2>
                </CardHeader>
                <CardBody className="px-6">
                    <ul className="grid grid-flow-row gap-4">
                        {
                            form.fields?.map((field: Field, index: number) => (
                                <li key={index} className="flex flex-col gap-2">
                                    <span>{index + 1}. {field.title}</span>
                                    <span className="text-xs text-gray-400">{field.description}</span>
                                    <div>
                                        <FieldItem                    
                                            field={field}
                                            onChange={handleFieldChange}
                                        />
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="flex justify-center mt-4">
                        <Button
                            className="mr-2"
                            color="primary"
                            size="sm"
                            variant="flat"
                            radius="sm"
                        >
                            Reset
                        </Button>
                        <Button
                            className=""
                            color="primary"
                            size="sm"
                            variant="solid"
                            radius="sm"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Copyright />
        </div>
    );
}