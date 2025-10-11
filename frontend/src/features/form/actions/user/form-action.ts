'use server'

import api from "@/features/core/library/api";
import { Result } from "@/features/core/types/result";
import { Form } from "@/features/form/types/form";

export async function get(uuid: string): Promise<Result<Form>> {
    const res: Result<Form> = await api.get(`api/form/${uuid}`).json();
    return res;
}

/**
 * Dynamically load control component by control name
 * @param controlName - The name of the control to load
 * @returns Promise that resolves to the control component
 */
export async function loadControlComponent(controlName: string){
    try {
        const componentModule = await import(`@/plugins/controls/${controlName}/component.tsx`);
        return componentModule.default;
    } catch (error) {
        console.error(`Failed to load control component: ${controlName}`, error);
        throw new Error(`Control component '${controlName}' not found`);
    }
}

export async function submit(uuid: string, data: any, version: number, visitorId: string, userAgent: string): Promise<Result<void>> {
    const res: Result<void> = await api.post(`api/form/${uuid}/submit`, {
        json: {
            data : data,
            version : version,
            visitor_id : visitorId,
            user_agent : userAgent
        }
    }).json();
    return res;
}

/**
 * Record form view
 * @param uuid - Form UUID
 * @param visitorId - Visitor ID
 * @param version - Form version
 * @param userAgent - User agent string
 * @returns Promise that resolves to Result
 */
export async function recordFormView(uuid: string, visitorId: string, version: number, userAgent: string): Promise<Result<void>> {
    try {
        const res: Result<void> = await api.post(`api/form/${uuid}/view`, {
            json: {
                visitor_id: visitorId,
                version: version,
                user_agent: userAgent
            }
        }).json();
        return res;
    } catch (error: any) {
        console.error('Record form view failed:', error);
        return { code: -1, msg: error.message || 'Network error', data: undefined };
    }
}