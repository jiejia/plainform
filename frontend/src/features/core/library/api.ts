import ky from 'ky';

const api = ky.create({
    prefixUrl: process.env.API_BASE_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                try {
                    let token = null;

                    if (typeof window === 'undefined') {
                        // server side
                        const { cookies } = await import('next/headers');
                        const cookieStore = await cookies();
                        token = cookieStore.get('token')?.value;
                    } else {
                        // client side
                        const cookies = document.cookie.split(';');
                        token = cookies.find(cookie => cookie.includes('token='));
                        token = token?.split('=')[1];
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