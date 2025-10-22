
'use server'

import api from "@/features/core/library/api";

/**
 * get options
 * 
 * @param group 
 * @param name 
 * @returns 
 */
export async function getOptions(group: string[] = ['general'], name: string[] = []) {
    try {
        const res:any = await api.post('api/option/get', {
            json: {
                group: group,
                name: name
            }
        }).json();
    
        return res
    } catch (err: any) {
        console.log("setting-action getOptions error: ", err);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
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

        return res;
    } catch (err: any) {
        console.log("setting-action setOptions error: ", err);
        return {
            code: 9999,
            msg: 'server_error'
        }
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
        return res;
    } catch (err: any) {
        console.log("setting-action getProfile error: ", err);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
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
        return res;
    } catch (err: any) {
        console.log("setting-action updateAvatar error: ", err);
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
}