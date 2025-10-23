'use server'

import api from "@/features/core/library/api";
import { Result } from "@/features/core/types/result";
import { Submission } from "@/features/form/types/submission/submission";
import { SearchParams as SubmissionSearchParams } from "@/features/form/types/submission/search-params";
import { PaginationParams } from "@/features/core/types/pagination-params";
import { initialSearchParams as initialSubmissionSearchParams } from "@/features/form/data/submission/initial-search-params";
import { initialPagination } from "../../data/initial-pagination";


/**
 * submission list
 * 
 * @param id 
 * @param args 
 * @returns 
 */
export async function list(id: number, args: SubmissionSearchParams = initialSubmissionSearchParams): Promise<Result<PaginationParams<Submission>>> {
    try {
        const res = await api.post(`api/admin/form/${id}/submission`, {
            json: {
                page: args.page,
                limit: args.limit,
                version: args.version,
                created_at_start: args.createdAtStart,
                created_at_end: args.createdAtEnd,
                ip: args.ip,
                dynamic_fields: args.dynamicFields,
                order_by: args.orderBy,
                order_type: args.orderType
            }
        }).json();
        return res as Result<PaginationParams<Submission>>;
    } catch (error: any) {
        console.log("submission-action list error: ", error);
        return {
            code: 9999,
            data: initialPagination,
            msg: 'core.server_error'
        }
    }
}


/**
 * export excel - get blob data from server
 * 
 * @param id 
 * @param args 
 * @returns ArrayBuffer for client-side download
 */
export async function exportExcel(id: number, args: SubmissionSearchParams = initialSubmissionSearchParams): Promise<Result<ArrayBuffer>> {
    try {
        const blob = await api.post(`api/admin/form/${id}/submission/export`, {
            json: {
                page: args.page,
                limit: args.limit,
                version: args.version,
                created_at_start: args.createdAtStart,
                created_at_end: args.createdAtEnd,
                ip: args.ip,
                dynamic_fields: args.dynamicFields,
                order_by: args.orderBy,
                order_type: args.orderType
            }
        }).arrayBuffer();

        return { code: 0, msg: 'success', data: blob } as Result<ArrayBuffer>;
    } catch (error: any) {
        console.log('submission-action exportExcel error: ', error);
        return {
            code: 9999,
            data: new ArrayBuffer(0),
            msg: 'core.server_error'
        } as Result<ArrayBuffer>;
    }
}

/**
 * batch delete submission
 * 
 * @param id 
 * @param ids 
 * @returns 
 */
export async function batchDelete(id: number, ids: number[]): Promise<Result<void>> {
    try {
        const res = await api.delete(`api/admin/form/${id}/submission`, {
            json: {
                ids: ids
            }
        }).json();
        return res as Result<void>;
    } catch (error: any) {
        console.log("submission-action batchDelete error: ", error);
        return {
            code: 9999,
            data: undefined,
            msg: 'core.server_error'
        }
    }
}