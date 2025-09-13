import Detail from "@/features/form/components/user/detail";

import { get } from "@/features/form/actions/user/form-action";
import { notFound } from "next/navigation";
import { Result } from "@/features/core/types/result";
import { Form as FormType } from "@/features/form/types/form";

export default async function Form({ params }: {params: Promise<{ uuid: string }>}) {
    
    const { uuid } = await params;

    const res: Result<FormType> = await get(uuid);

    if (res.code !== 0) {
        notFound();
    }

    return (
        <>
            <Detail form={res.data}/>
        </>
    );
}