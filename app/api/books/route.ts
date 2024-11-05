import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function GET(request: NextRequest) {
	let books: string[] = ["Clickable.pdf", "Corso di informatica 3.pdf", "Il bello della letteratura.pdf", "LA matematica a colori VERDE 5.pdf", "Dall’idea alla startup.pdf", "Internetworking.pdf", "Project Work.pdf", "Noi nel tempo 3.pdf"];

	return NextResponse.json({ books }, { status: 200, headers });
}