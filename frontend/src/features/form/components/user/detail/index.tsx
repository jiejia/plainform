'use client'

import { Form as FormType } from "@/features/form/types/form";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";
import { Field } from "@/features/form/types/field";
export default function Detail({ form }: { form: FormType }) {

    console.log(form.fields);
    return (
        <div className="py-4 px-4 h-screen">
            <Card className="h-full mx-auto max-w-5xl">
                <CardHeader className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">{form.title}</h2>
                </CardHeader>
                <CardBody>
                    <ul className="grid grid-flow-row gap-2">
                        {
                            form.fields?.map((field: Field, index: number) => (
                                <li key={index}>
                                    <span>{index + 1}. {field.title}</span>
                                    <div>

                                    </div>
                                </li>
                            ))
                        }
                    </ul>

                </CardBody>

            </Card>

        </div>
    );
}