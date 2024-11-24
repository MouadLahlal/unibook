import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { env } from "process";
import { User } from "@/types/store";

interface Payload extends jose.JWTPayload {
    user: User
}

export async function GET(request: NextRequest) {
    const token: string | null = request.cookies.get("auth_token")?.value || null;
    const key = new TextEncoder().encode(env.JWT_SECRET || "");

    if (!token) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 404 });
    }

    try {
        const { payload } : { payload: Payload } = await jose.jwtVerify(token || "", key, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE,
        });

        return NextResponse.json({ user: payload.user }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "User not authenticated" }, { status: 404 });
    }
}