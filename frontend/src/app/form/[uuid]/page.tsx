import Detail from "@/features/form/components/user/detail";

import { get } from "@/features/form/actions/user/form-action";
import { notFound } from "next/navigation";
import { Result } from "@/features/core/types/result";
import { Form as FormType } from "@/features/form/types/form";
import { loadControlComponent } from "@/features/form/actions/user/form-action";
import { Field } from "@/features/form/types/field";

export default async function Form({ params }: { params: Promise<{ uuid: string }> }) {

    const { uuid } = await params;

    const res: Result<FormType> = await get(uuid);

    if (res.code !== 0) {
        notFound();
    }

    // load control component
    res.data.fields?.forEach(async (field: Field) => {
        const controlComponent = await loadControlComponent(field.control_type);
        console.log("controlComponent", controlComponent);
        field.component = controlComponent;
    });
    if (res.data.fields) {
        await Promise.all(
            res.data.fields.map(async (field: Field) => {
                field.component = await loadControlComponent(field.control_type);
            })
        );
    }

    return (
        <>
            <Detail form={res.data} />
        </>
    );
}