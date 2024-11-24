import { NextRequest, NextResponse } from "next/server";
import * as crypto from "node:crypto"
import { pool } from "@/lib/db";
import { env } from "node:process";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function POST(request: NextRequest) {
	const data = await request.json();
	const algorithm = 'aes-192-cbc';
	const password = env.CRYPTO_PSW || "";
	const salt = env.CRYPTO_SALT || "";
	const key = crypto.scryptSync(password, salt, 24);

	if (!password) {
		return NextResponse.json({ message: "Server error" }, { status: 504, headers });
	}

	const encrypt = () => new Promise<{ encrypted: string, iv: string }>((resolve) => {
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		let encrypted_password = cipher.update(data.password, 'utf8', 'hex');
		encrypted_password += cipher.final('hex');

		resolve({ encrypted: encrypted_password, iv: iv.toString('hex') });
	});

	const user = request.headers.get("x-user-id");

	const encryptedData = await encrypt();

	await pool?.any("INSERT INTO platform_credentials (id, account_id, platform_name, platform_username, encrypted_password) values ($1, $2, $3, $4, $5)", [crypto.randomBytes(16).toString('hex'), user, "hubyoung", data.email, encryptedData]);

	return NextResponse.json({ messaggio: "Account saved" }, { status: 200, headers });
}