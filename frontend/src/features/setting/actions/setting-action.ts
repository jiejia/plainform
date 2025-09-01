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
        const res:any = await api.get('api/admin/option/get', {
            json: {
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
export async function setOptions(group: string = 'general', name: string = '', value: string = '') {    
    try {
        const res:any = await api.post('api/admin/option/set', {
            json: {
                group: group,
                name: name,
                value: value
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