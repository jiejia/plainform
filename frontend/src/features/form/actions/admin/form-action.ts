'use server'

import api from "@/features/core/library/api";
import { Control } from "@/features/form/types/control";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";
import { SearchParams} from "@/features/form/types/list/search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { initialSearchParams } from "@/features/form/data/initial-search-params";
import { initialSearchParams as initialSubmissionSearchParams } from "@/features/form/data/submission/initial-search-params";
import { SearchParams as SubmissionSearchParams } from "@/features/form/types/submission/search-params";
import { Submission } from "@/features/form/types/submission/submission";

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
export async function list(args: SearchParams = initialSearchParams): Promise<Result<PaginationParams<FormInList>>> {
    const res = await api.post('api/admin/form/list', {
         json: {
            page: args.page,
            limit: args.limit,
            keyword: args.keyword,
            created_at_start: args.createdAtStart,
            created_at_end: args.createdAtEnd,
            submissions_count_start: args.submissionsCountStart,
            submissions_count_end: args.submissionsCountEnd,
            status: args.status,
            order_by: args.orderBy,
            order_type: args.orderType
        }
    }).json();

    return res as Result<PaginationParams<FormInList>>;
}


export async function getVersions(id: number): Promise<Result<number[]>> {
    const res: Result<number[]> = await api.get(`api/admin/form/${id}/submission/versions`).json();
    return res;
}

/**
 * batch update enabled
 * 
 * @param items 
 */
export async function batchUpdateEnabled(items: { id: number, enabled: boolean }[]) {
    const res: Result<void> = await api.patch('api/admin/form/batch-update-enabled', {
        json: { items }
    }).json();
    return res;
}
 

/**
 * batch delete
 * 
 * @param ids 
 */
export async function batchDelete(ids: number[]) {
    const res: Result<[]> = await api.delete('api/admin/form', {
        json: { ids }
    }).json();
    return res;
}
 