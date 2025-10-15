
'use server'

import api from "@/features/core/library/api";

/**
 * get options
 * 
 * @param group 
 * @param name 
 * @returns 
 */
export async function getOptions(group: string = 'general', name: string = '') {
    try {
        const res:any = await api.get('api/option/get', {
            searchParams: {
                group: group,
                name: name
            }
        }).json();
    
        if (res.code === 0) {
            return res.data;
        } else {
            return res.msg;
        }
    } catch (err: any) {
        return err.message;
    }
}


/**
 * set options
 * 
 * @param group 
 * @param name 
 * @param value 
 * @returns 
 */
export async function setOptions(group: string, name: string, value: any) {    
    try {
        const res:any = await api.post('api/admin/option/set', {
            json: {
                update_group: group,
                update_name: name,
                update_data: value
            }
        }).json();

        if (res.code === 0) {
            return true;
        } else {
            return res.msg;
        }
    } catch (err: any) {
        return err.message;
    }
}

/**
 * get profile
 * 
 * @returns 
 */
export async function getProfile() {
    try {
        const res:any = await api.get('api/admin/profile/me').json();
        if (res.code === 0) {
            return res.data;
        } else {
            return res.msg;
        }
    } catch (err: any) {
        return err.message;
    }
}

/**
 * update avatar
 * 
 * @param avatar 
 * @returns 
 */
export async function updateAvatar(avatar: string) {
    try {
        const res:any = await api.post('api/admin/profile/update-avatar', {
            json: {
                avatar_url: avatar
            }
        }).json();
        if (res.code === 0) {
            return true;
        } else {
            return res.msg;
        }
    } catch (err: any) {
        return err.message;
    }
}