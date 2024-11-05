import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function GET(request: NextRequest) {
	return NextResponse.json({ message: "hello world" }, { status: 200, headers });
}
