'use server'

import api  from "@/features/core/library/api";
import { Control } from "@/features/form/types/control";

/**
 * get controls
 * @returns Control[]
 */
export async function getControls(): Promise<Control[]> {
    const res:any = await api.get('api/admin/form/controls').json();
    if (res.code === 0) {
        return res.data as Control[];
    } else {
        return [] as Control[];
    }
}