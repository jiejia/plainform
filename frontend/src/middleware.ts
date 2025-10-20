import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from '@/features/core/library/api';
import { CookieKey } from '@/features/core/constants/cookie-key';
import createMiddleware from 'next-intl/middleware';
import { getOptions } from '@/features/setting/actions/setting-action';

// 创建 next-intl 中间件
const intlMiddleware = createMiddleware({
    locales: ['en-us', 'zh-cn', 'ko'],
    defaultLocale: 'en-us',
    localePrefix: 'never'
});

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
    let isAuthRoute = null;
    const prefix = path.split('/')[1];

    if (prefix === 'dashboard') {
        isAuthRoute = 'admin';
    } else if (prefix === 'login' || prefix === 'forget-password' || prefix === 'reset-password') {
        isAuthRoute = 'admin_login';
    } else if (prefix === 'form') {
        isAuthRoute = 'user';
    }

    return isAuthRoute;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const intlResponse = intlMiddleware(request);

    // get current route path
    const isAuthRoute = checkIsAuthRoute(request);

    // get or cache language setting
    let locale = null;
    if (!request.cookies.get(CookieKey.LANGUAGE)?.value) {
        const options = await getOptions(['general'], ['default_language']);
        locale = options.general.default_language as string;
    }

    try {
        // wait for api call to complete
        const res: any = await api.get('api/admin/profile/me').json();

        if (res.code === 0) {
            // generate a response object
            const response = isAuthRoute === 'admin_login'
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

            if (locale) {
                response.cookies.set({
                    name: CookieKey.LANGUAGE,
                    value: locale,
                    maxAge: 60 * 60 * 24 * 365, // a year
                    path: '/',
                    httpOnly: false,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                })
            }

            return response
        }
    } catch (err: any) {
        if (err.response?.status === 401 && isAuthRoute === 'admin') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    const response = NextResponse.next();
    if (locale) {
        response.cookies.set({
            name: CookieKey.LANGUAGE,
            value: locale,
            maxAge: 60 * 60 * 24 * 365,
            path: '/',
            httpOnly: false,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        })
    }
    return response;
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