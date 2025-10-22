'use server'

import api from "@/features/core/library/api";
import { CookieKey } from "@/features/core/constants/cookie-key";
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
            cookieStore.set(CookieKey.ADMIN_TOKEN, token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: '/'
            });
        }

        return res;
    } catch (err: any) {
        return {
            code: 9999,
            msg: 'core.server_error'
        }
    }
}

/**
 * logout action
 */
export async function logout() {

    // fetch logout api
    const res:any = await api.post('api/admin/auth/logout').json();

    const cookieStore = await cookies();
    cookieStore.delete(CookieKey.ADMIN_TOKEN);
    cookieStore.delete(CookieKey.ADMIN);

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


/**
 * reset password action
 * 
 * @param email
 * @param newPassword
 * @param confirmPassword
 * @returns
 */
export async function resetPasswordByEmail(email: string, newPassword: string, confirmPassword: string, resetPasswordToken: string) {
    try {
        const res:any = await api.post('api/admin/auth/reset-password', {
            json: {
                email: email,
                password: newPassword,
                password_confirmation: confirmPassword,
                reset_password_token: resetPasswordToken
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
 * reset password action
 * 
 * @param oldPassword 
 * @param newPassword 
 * @param confirmPassword 
 * @returns 
 */
export async function resetPassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    try {
        const res:any = await api.post('api/admin/profile/update-password', {
            json: {
                old_password: oldPassword,
                password: newPassword,
                password_confirmation: confirmPassword
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
 * update email action
 * 
 * @param email
 * @param code
 * @returns
 */
export async function updateEmail(email: string, code: string) {
    try {
        const res:any = await api.post('api/admin/profile/update-email', {
            json: {
                email: email,
                code: code
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
 * send email reset code action
 * 
 * @param email
 * @returns
 */
export async function sendEmailResetCode(email: string) {
    try {
        const res:any = await api.post('api/admin/profile/send-email-reset-code', {
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