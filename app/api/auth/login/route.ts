import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function POST(request: NextRequest) {
	const data = await request.json();
	const cookieStore = await cookies()
	const formatUser = (user: any) => ({
		id: user.id,
		username: user.username,
		email: user.email
	});

	let res = await pool.oneOrNone("SELECT * FROM accounts WHERE email = $1", [data.email]);

	let [salt, key] = res.password_hash.split(":");
	let hash = crypto.scryptSync(data.password, salt, 64).toString("hex");
	
	if (hash == key) {
		let user = formatUser(res);
		cookieStore.set('auth_token', user.id);
		return NextResponse.json({ user }, { status: 200, headers });
	}

	return NextResponse.json({ message: "Wrong credentials" }, { status: 404, headers });
}