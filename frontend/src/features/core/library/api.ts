import ky from 'ky';
import { CookieKey } from '@/features/core/constants/cookie-key';

const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                try {
                    let token = null;

                    if (typeof window === 'undefined') {
                        // server side
                        const { cookies } = await import('next/headers');
                        const cookieStore = await cookies();
                        token = cookieStore.get(CookieKey.ADMIN_TOKEN)?.value;
                    } else {
                        // client side
                        const Cookies = await import('js-cookie');
                        token = Cookies.default.get(CookieKey.ADMIN_TOKEN);
                    }

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