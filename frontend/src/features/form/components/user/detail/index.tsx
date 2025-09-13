'use client'


import { Form as FormType } from "@/features/form/types/form";
import { Card, CardBody, CardHeader, CardFooter } from "@heroui/react";

export default function Detail({ form }: { form: FormType }) {

    console.log(form.fields);
    return (
        <div className="py-4 px-4 min-h-screen">
            <Card>
                   <CardHeader className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">{form.title}</h2>
                    </CardHeader> 
                    <CardBody>

                    </CardBody>

            </Card>

        </div>
    );
}