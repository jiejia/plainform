'use server'

import api from "@/features/core/library/api";
import { Control } from "@/features/form/types/control";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";
import { SearchParams } from "@/features/form/types/list/search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";

/**
 * get controls
 * @returns Control[]
 */
export async function getControls(): Promise<Control[]> {
    const res: Result<Control[]> = await api.get('api/admin/form/controls').json();

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
    const res: Result<Form> = await api.get(`api/admin/form/${id}`).json();
    return res;
}

/**
 * create form
 * 
 * @param form 
 */
export async function create(form: Form) {
    const res: Result<Form> = await api.post('api/admin/form', {
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
    const res: Result<Form> = await api.put(`api/admin/form/${id}`, {
        json: form
    }).json();

    return res;
}

/**
 * list forms
 * 
 * @param page 
 * @param limit 
 * @param keyword 
 * @param createdAtStart 
 * @param createdAtEnd 
 * @param submissionsCountStart 
 * @param submissionsCountEnd 
 * @param status 
 * @param orderBy 
 * @param orderType 
 * @returns 
 */
export async function list(args: SearchParams = {
    page: 1,
    limit: 10,
    keyword: '',
    createdAtStart: '',
    createdAtEnd: '',
    submissionsCountStart: 0,
    submissionsCountEnd: 0,
    status: [],
    orderBy: 'id',
    orderType: 'desc'
}): Promise<PaginationParams<FormInList>> {
    const res = await api.get('api/admin/form', {
        json: {
            page: args.page,
            limit: args.limit,
            keyword: args.keyword,
            createdAtStart: args.createdAtStart,
            createdAtEnd: args.createdAtEnd,
            submissionsCountStart: args.submissionsCountStart,
            submissionsCountEnd: args.submissionsCountEnd,
            status: args.status,
            orderBy: args.orderBy,
            orderType: args.orderType
        }
    }).json();

    return res as PaginationParams<FormInList>;
}