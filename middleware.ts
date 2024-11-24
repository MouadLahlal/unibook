import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "process";
import { User } from "./types/store";

interface Payload extends jose.JWTPayload {
    user: User
}

export async function middleware(request: NextRequest) {
    const token: string | null = request.cookies.get("auth_token")?.value || null;
    const key = new TextEncoder().encode(env.JWT_SECRET || "");
    // const protectedRoutes = ['/', '/profile', '/pdf-viewer', '/api'];
    const publicRoutes = ['/auth/login', '/auth/signup', '/api/auth/login', '/api/auth/signup'];

    // if (!protectedRoutes.includes(request.nextUrl.pathname)) {
    //     return NextResponse.next();
    // }
    if (publicRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
        const { payload } : { payload: Payload } = await jose.jwtVerify(token || "", key, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });

        const headers = new Headers(request.headers);

        headers.set("x-user-id", payload.user.id);
        
        return NextResponse.next({
            headers
        });
    } catch (error) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

// export const config = {
//     matcher: ['/:path*'],
// };

export const config = {
    matcher: [ '/((?!_next/static|_next/image|favicon.ico).*)', ]
  }