'use server'

import api  from "@/features/core/library/api";
import { Control } from "@/features/form/types/control";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";

/**
 * get controls
 * @returns Control[]
 */
export async function getControls(): Promise<Control[]> {
    const res:Result<Control[]> = await api.get('api/admin/form/controls').json();
    
    if (res.code === 0) {
        return res.data as Control[];
    } else {
        return [] as Control[];
    }
}

/**
 * get form
 * 
 * @param id 
 * @returns 
 */
export async function get(id: number) {
    const res:Result<Form> = await api.get(`api/admin/form/${id}`).json();
    return res;
}

/**
 * create form
 * 
 * @param form 
 */
export async function create(form: Form) {
    const res:Result<Form> = await api.post('api/admin/form', {
        json: form
    }).json();

    return res;
}

/**
 * update form
 * 
 * @param id 
 * @param form 
 * @returns 
 */
export async function update(id: number, form: Form) {
    const res:Result<Form> = await api.put(`api/admin/form/${id}`, {
        json: form
    }).json();

    return res;
}