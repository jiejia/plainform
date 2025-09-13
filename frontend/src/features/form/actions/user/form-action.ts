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
export async function loadControlComponent(controlName: string) {
    try {
        const componentModule = await import(`@/plugins/controls/${controlName}/component.tsx`);
        return componentModule.default;
    } catch (error) {
        console.error(`Failed to load control component: ${controlName}`, error);
        throw new Error(`Control component '${controlName}' not found`);
    }
}