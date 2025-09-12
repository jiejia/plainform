'use server'

import api from "@/features/core/library/api";

export async function get(uuid: string) {
    const res: any = await api.get(`api/form/${uuid}`).json();
    return res;
}