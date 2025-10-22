'use server'

import api from "@/features/core/library/api";
import { Control } from "@/features/form/types/control";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";
import { SearchParams } from "@/features/form/types/list/search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { Form as FormInList } from "@/features/form/types/list/form";
import { initialSearchParams } from "@/features/form/data/initial-search-params";
import { initialPagination } from "../../data/initial-pagination";

/**
 * get controls
 * @returns Control[]
 */
export async function getControls(): Promise<Result<Control[]>> {
    try {
        const res: Result<Control[]> = await api.get('api/admin/form/controls').json();
        return res;
    } catch (error: any) {
        console.log("form-action getControls error: ", error);
        return {
            code: 9999,
            data: [],
            msg: 'core.server_error'
        }
    }
}

/**
 * get form
 * 
 * @param id 
 * @returns 
 */
export async function get(id: number) {
    try {
        const res: Result<Form> = await api.get(`api/admin/form/${id}`).json();
        return res;
    } catch (error: any) {
        console.log("form-action get error: ", error);
        return {
            code: 9999,
            data: undefined as unknown as Form,
            msg: 'core.server_error'
        }
    }
}

/**
 * create form
 * 
 * @param form 
 */
export async function create(form: Form) {
    try {
        const res: Result<Form> = await api.post('api/admin/form', {
            json: form
        }).json();
        return res;
    } catch (error: any) {
        console.log("form-action create error: ", error);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
}

/**
 * update form
 * 
 * @param id 
 * @param form 
 * @returns 
 */
export async function update(id: number, form: Form) {
    try {
        const res: Result<Form> = await api.put(`api/admin/form/${id}`, {
            json: form
        }).json();
        return res;
    } catch (error: any) {
        console.log("form-action update error: ", error);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
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
    try {
        const res: Result<PaginationParams<FormInList>> = await api.post('api/admin/form/list', {
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
        return res;
    } catch (error: any) {
        console.log("form-action list error: ", error);
        return {
            code: 9999,
            data: initialPagination,
            msg: 'core.server_error'
        }
    }
}

/**
 * get versions
 * 
 * @param id 
 * @returns 
 */
export async function getVersions(id: number): Promise<Result<number[]>> {
    try {
        const res: Result<number[]> = await api.get(`api/admin/form/${id}/submission/versions`).json();
        return res;
    } catch (error: any) {
        console.log("form-action getVersions error: ", error);
        return {
            code: 9999,
            data: [],
            msg: 'core.server_error'
        }
    }
}

/**
 * batch update enabled
 * 
 * @param items 
 */
export async function batchUpdateEnabled(items: { id: number, enabled: boolean }[]) {
    try {
        const res: Result<void> = await api.patch('api/admin/form/batch-update-enabled', {
            json: { items }
        }).json();
        return res;
    } catch (error: any) {
        console.log("form-action batchUpdateEnabled error: ", error);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
}


/**
 * batch delete
 * 
 * @param ids 
 */
export async function batchDelete(ids: number[]) {
    try {
        const res: Result<[]> = await api.delete('api/admin/form', {
            json: { ids }
        }).json();
        return res;
    } catch (error: any) {
        console.log("form-action batchDelete error: ", error);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
}

/**
 * get statistics
 * 
 * @param id 
 * @param version 
 * @param periodType 
 * @returns 
 */
export async function statistics(id: number, version: number | null, periodType: string) {
    try {
        const res: Result<any> = await api.post(`api/admin/form/${id}/statistics`, {
            json: { version, period_type: periodType }
        }).json();
        return res;
    } catch (error: any) {
        console.log("form-action statistics error: ", error);
        return {
            code: 9999,
            data: null,
            msg: 'core.server_error'
        }
    }
}