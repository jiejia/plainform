import { cookies } from 'next/headers';
import ky from 'ky';


/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(status: number, message: string, data?: any) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * API response interface
 */
export interface ApiResponse<T = any> {
    data?: T;
    message?: string;
    errors?: any;
    status: number;
}

const api = ky.create({
    prefixUrl: process.env.API_BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                try {
                    const cookieStore = await cookies();
                    const token = cookieStore.get('token')?.value;
                    if (token) {
                        request.headers.set('Authorization', `Bearer ${token}`);
                    }
                } catch (error) {
                    // Handle error silently in middleware context
                }
                
                request.headers.set('Content-Type', 'application/json');
                request.headers.set('X-Requested-With', 'XMLHttpRequest');
            }
        ],
    }
});

export default api;