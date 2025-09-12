import Detail from "@/features/form/components/user/detail";

import { get } from "@/features/form/actions/user/form-action";
import { notFound } from "next/navigation";

export default async function Form({ params }: {params: Promise<{ uuid: string }>}) {
    
    const { uuid } = await params;

    const res = await get(uuid);

    if (res.code !== 0) {
        notFound();
    }

    return (
        <>
            <Detail/>
        </>
    );
}