import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("auth_token");
    const protectedRoutes = ['/', '/profile', '/pdf-viewer'];

    if (protectedRoutes.includes(request.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
};