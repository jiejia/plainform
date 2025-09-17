'use client'

import { Form as FormType } from "@/features/form/types/form";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import Copyright from "@/features/core/components/admin/copyright";
import { useState } from "react";

export default function Detail({ form }: { form: FormType }) {

    const [fields, setFields] = useState<Field[]>(form.fields || []);

    return (
        <div className="py-4 px-4 min-h-screen">
            <Card className="h-full mx-auto max-w-5xl mt-2">
                <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{form.title}</h2>
                </CardHeader>
                <CardBody className="px-6">
                    <ul className="grid grid-flow-row gap-4">
                        {
                            fields.map((field: Field, index: number) => (
                                <li key={index} className="flex flex-col gap-2">
                                    <span>{index + 1}. {field.title}</span>
                                    <div>
                                        {field.component && <field.component field={field} />}
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