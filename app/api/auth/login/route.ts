import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { cookies } from 'next/headers';
import { User } from "@/types/store";
import * as jose from "jose";
import { env } from "process";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function POST(request: NextRequest) {
	const data = await request.json();
	const cookieStore = await cookies();
	
	const formatUser = (user: User) => ({
		id: user.id,
		username: user.username,
		email: user.email
	});

	const res = await pool?.oneOrNone("SELECT * FROM accounts WHERE email = $1", [data.email]);

	const [salt, key] = res.password_hash.split(":");
	const hash = crypto.scryptSync(data.password, salt, 64).toString("hex");
	
	if (hash == key) {
		const user = formatUser(res);
		const key = new TextEncoder().encode(env.JWT_SECRET || "");
		const token = await new jose.SignJWT({ user })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setAudience(env.JWT_AUDIENCE || "")
			.setIssuer(env.JWT_ISSUER || "")
			.setExpirationTime(env.JWT_EXPIRATION_TIME || "")
		 	.sign(key);
		
		cookieStore.set('auth_token', token);
		
		return NextResponse.json({ user }, { status: 200, headers });
	}

	return NextResponse.json({ message: "Wrong credentials" }, { status: 404, headers });
}