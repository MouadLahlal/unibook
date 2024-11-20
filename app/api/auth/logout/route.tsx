import { NextResponse } from "next/server";
import {cookies} from "next/headers";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function GET() {
	const cookieStore = await cookies();
    cookieStore.delete("auth_token");
    return NextResponse.json({ message: "Logged out" }, { status: 200, headers });
}