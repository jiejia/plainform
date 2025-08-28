'use server'

import api from "@/features/core/library/api";
import { cookies } from "next/headers";

/**
 * login action
 * 
 * @param email
 * @param password
 * @returns
 */
export async function login(email: string, password: string) {
    
    try {
        const res:any = await api.post('api/admin/auth/login', {
            json: {
                email: email,
                password: password  
            }
        }).json();

        if (res.code === 0) {
            // get token 
            const token = res.data.token;

            // set token to cookies
            const cookieStore = await cookies();
            cookieStore.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });

            return true
        } else {
            return res.msg;
        }
    } catch (err: any) {
        return err.message;
    }
}

/**
 * logout action
 */
export async function logout() {

    // fetch logout api
    const res:any = await api.post('api/admin/auth/logout').json();

    const cookieStore = await cookies();
    cookieStore.delete('token');


    return true;
}

/**
 * forget password action
 * 
 * @param email
 * @returns
 */
export async function forgetPassword(email: string) {
    try {
        const res:any = await api.post('api/admin/auth/send-forget-password-email', {
            json: {
                email: email
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