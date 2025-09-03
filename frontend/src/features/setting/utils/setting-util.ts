'use client'

import api from "@/features/core/library/api";


/**
 * upload avatar
 * 
 * @param formData 
 * @returns 
 */
export async function uploadAvatar(formData: FormData) {
    
    try {
        const res:any = await api.post('api/admin/profile/upload-avatar', {
            body: formData
        }).json();

        return res;

    }  catch (err: any) {
        return err;
    }
}