
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from '@/lib/auth-utils';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server'
import { deleteCookie } from './services/auth/tokenHandlers';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    console.log("pathname", request.nextUrl.pathname)
    const pathname = request.nextUrl.pathname;
    //   return NextResponse.redirect(new URL('/', request.url))
    const accessToken = request.cookies.get("accessToken")?.value || null;
    let userRole: UserRole | null = null;
    if (accessToken) {
        const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.JWT_SECRET as string);

        if (typeof verifiedToken === "string") {
            // cookieStore.delete("accessToken");
            // cookieStore.delete("refreshToken");
            await deleteCookie("accessToken")
            await deleteCookie("refreshToken")
            return NextResponse.redirect(new URL('/login', request.url));
        }

        console.log({verifiedToken})

        userRole = verifiedToken.role;
    }
    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname)
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }
    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }
    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }
    if (routerOwner === "ADMIN" || routerOwner === "GUIDE" || routerOwner === "TOURIST") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
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
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}