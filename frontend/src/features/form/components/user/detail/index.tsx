'use client'

import { Form as FormType } from "@/features/form/types/form";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import Copyright from "@/features/core/components/admin/copyright";
import { useState, useEffect } from "react";
import { submit } from "@/features/form/actions/user/form-action";
import { msg } from "@/features/core/utils/ui";
import { clsx } from "clsx";
import { config } from "@/features/form/types/config";
import { getOrCreateVisitorId } from "@/features/core/utils/session";
import { recordFormView } from "@/features/form/actions/user/form-action";
import ThemeToggle from "@/features/core/components/shared/theme-toggle";

interface FieldItemProps {
    field: Field;
    onChange: (uuid: string, value: unknown) => void;
}

type Errors = {
    [key: string]: string;
}

function FieldItem({ field, value, onChange }: FieldItemProps & { value: unknown }) {
    const handleChange = (v: unknown) => onChange(field.uuid, v);
    return field.component
        ? <field.component field={field} value={value} setValue={handleChange} />
        : null;
}
export default function Detail({ form }: { form: FormType }) {

    const [formData, setFormData] = useState<Array<{
        uuid: string;
        name: string;
        value: unknown;
        config: config;
        control_type: string;
    }>>([]);

    const [errors, setErrors] = useState<Errors>({});

    const [isPending, setIsPending] = useState(false);

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
                    name: field?.title || '',
                    value,
                    config: field?.config || {} as config,
                    control_type: field?.control_type || ''
                }];
            }
        });

        // clear error
        setErrors(prev => {
            if (!prev[uuid]) return prev;   // if no error, return prev
            const { [uuid]: _, ...rest } = prev;  // delete error
            return rest;
        });
    };

    const handleSubmit = async () => {
        setIsPending(true);

        // console.log("formData", formData);

        if (!form.uuid) {
            return;
        }

        // validate form data (required)
        for (const field of form.fields || []) {
            if (field.required) {
                if (!formData.find(item => item.uuid === field.uuid)?.value) {
                    // set error
                    const newErrors = { ...errors, [field.uuid]: "This field is required" };
                    setErrors(newErrors);
                    console.log("newErrors", newErrors);

                    // scroll to field
                    document.getElementById(field.uuid)?.scrollIntoView({ behavior: 'smooth' });

                    // set pending to false
                    setIsPending(false);

                    return;
                }
            }
        }

        // validate form data (regex)
        for (const field of form.fields || []) {
            if (field.regex) {
                if (typeof formData.find(item => item.uuid === field.uuid)?.value === 'string') {
                    const regex = new RegExp(field.regex);
                    if (!regex.test(formData.find(item => item.uuid === field.uuid)?.value as string)) {

                        setErrors(prev => ({ ...prev, [field.uuid]: field.config.regex.warning_message ? field.config.regex.warning_message : "This field is invalid" }));

                        // scroll to field
                        document.getElementById(field.uuid)?.scrollIntoView({ behavior: 'smooth' });

                        // set pending to false
                        setIsPending(false);

                        return;
                    }
                } else if (Array.isArray(formData.find(item => item.uuid === field.uuid)?.value)) {
                    const regex = new RegExp(field.regex);
                    if (!regex.test(formData.find(item => item.uuid === field.uuid)?.value as string)) {

                        setErrors(prev => ({ ...prev, [field.uuid]: field.config.regex.warning_message ? field.config.regex.warning_message : "This field is invalid" }));
                    }

                    // scroll to field
                    document.getElementById(field.uuid)?.scrollIntoView({ behavior: 'smooth' });

                    // set pending to false
                    setIsPending(false);

                    return;
                }
            }
        }

        console.log("formData", JSON.stringify(formData));

        const res = await submit(form.uuid, formData, form.version || 1, getOrCreateVisitorId(), navigator.userAgent);
        if (res.code === 0) {
            msg("Success", "Submit successfully", "success");
            initializeFormData();
            initializeErrors();
        } else {
            msg("Error", res.msg, "warning");
        }

        setIsPending(false);
    };

    const initializeFormData = () => {
        if (form.fields) {
            const initialData = form.fields.map((field: Field) => ({
                uuid: field.uuid,
                name: field.title,
                value: field.config.default_value.value,
                config: field.config,
                control_type: field.control_type
            }));
            console.log("initialData", initialData);
            setFormData(initialData);
        }
    }

    const initializeErrors = () => {
        if (form.fields) {
            const initialErrors = formData.reduce((acc: Errors, item: { uuid: string; name: string; value: unknown }) => {
                acc[item.uuid] = '';
                return acc;
            }, {});
            setErrors(initialErrors);
        }
    }

    useEffect(() => {
        initializeFormData();
        initializeErrors();

    }, [form.fields]);

    useEffect(() => {
        if (form.uuid && form.version) {
            recordFormView(form.uuid, getOrCreateVisitorId(), form.version || 1, navigator.userAgent);
        }
    }, [form.uuid, form.version]);


    return (
        <div className="py-4 px-4 min-h-screen relative">
            <ThemeToggle className="absolute top-2 right-2 z-1000" />
            <Card className="h-full mx-auto max-w-5xl mt-2">
                <CardHeader className="flex flex-col gap-2 pt-8 pb-4">
                    <h2 className="text-2xl font-bold">{form.title}</h2>
                </CardHeader>
                <CardBody className="px-6">
                    <ul className="grid grid-flow-row gap-4">
                        {
                            form.fields?.map((field: Field, index: number) => (
                                <li key={index} className={clsx("flex flex-col gap-2 p-2", errors[field.uuid] && "")} id={field.uuid}>
                                    <span>
                                        <span>{index + 1}.</span>
                                        <span className="text-md">{field.title}</span>
                                        <i className="text-md text-red-400 ml-1 align-middle">{field.required ? "*" : ""}</i>
                                        {
                                            errors[field.uuid] &&
                                            <span className="text-xs text-red-400 ml-4text-danger-500 text-xs bg-danger-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0 ml-2">
                                                {errors[field.uuid]}
                                            </span>
                                        }
                                    </span>
                                    <span className="text-xs text-gray-400">{field.description}</span>
                                    <div>
                                        <FieldItem
                                            field={field}
                                            value={formData.find(i => i.uuid === field.uuid)?.value}
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
                            onPress={() => confirm("Are you sure you want to reset the form?") && initializeFormData() && initializeErrors()}
                        >
                            Reset
                        </Button>
                        <Button
                            className=""
                            color="primary"
                            size="sm"
                            variant="solid"
                            radius="sm"
                            isLoading={isPending}
                            disabled={isPending}
                            onPress={handleSubmit}
                        >
                            {isPending ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Copyright />
        </div>
    );
}