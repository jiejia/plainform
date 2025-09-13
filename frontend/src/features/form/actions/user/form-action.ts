'use server'

import api from "@/features/core/library/api";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";

export async function get(uuid: string): Promise<Result<Form>> {
    const res: any = await api.get(`api/form/${uuid}`).json();
    return res;
}