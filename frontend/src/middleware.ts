import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from '@/features/core/library/api';
import { HTTPError } from 'ky';
import { CookieKey } from '@/features/core/constants/cookie-key';

/**
 * check if is auth route 
 *  
 * @param request 
 * @returns 
 */
function checkIsAuthRoute(request: NextRequest) {
    // get current route path
    const path = request.nextUrl.pathname;

    // check path's prefix
    let isAuthRoute = false;
    const prefix = path.split('/')[1];

    console.log("prefix", prefix);
    if (prefix === 'dashboard') {
        isAuthRoute = false;
    } else if (prefix === 'login' || prefix === 'forget-password' || prefix === 'reset-password' || prefix === 'form') {
        isAuthRoute = true;
    }

    return isAuthRoute;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    // get current route path
    const isAuthRoute = checkIsAuthRoute(request);

    try {
        // wait for api call to complete
        const res: any = await api.get('api/admin/profile/me').json();

        if (res.code === 0) {
            // generate a response object
            const response = isAuthRoute
              ? NextResponse.redirect(new URL('/dashboard', request.url))
              : NextResponse.next()
      
            // write cookie
            response.cookies.set({
              name: CookieKey.ADMIN,
              value: JSON.stringify({
                id: res.data.id,
                username: res.data.username,
                avatar: res.data.avatar,
                email: res.data.email,
              }),
              maxAge: 60 * 60 * 24 * 30,
              path: '/',
              httpOnly: false,
              sameSite: 'strict',
              secure: process.env.NODE_ENV === 'production',
            })
      
            return response 
          }
    } catch (err: any) {
        if (err.response?.status === 401 && !isAuthRoute) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|\\.well-known).*)',
    ],
}