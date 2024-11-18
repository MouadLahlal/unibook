import { pool } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as crypto from "crypto";

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function POST(request: NextRequest) {
    const data = await request.json();

    let id = crypto.randomUUID();
    let salt = crypto.randomBytes(16).toString("hex");
	let psw_hash = `${salt}:${crypto.scryptSync(data.password, salt, 64).toString("hex")}`;

    await pool.any("INSERT INTO accounts (id, username, email, password_hash) values ($1, $2, $3, $4)", [id, data.username, data.email, psw_hash]);

    return NextResponse.json({message: "Account created"}, {status: 200, headers});
}