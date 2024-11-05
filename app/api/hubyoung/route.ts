import { NextRequest, NextResponse } from "next/server";
import { HubYoung } from 'hub-young-downloader';

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

export async function POST(request: NextRequest) {
	const data = await request.json();

	let obj = new HubYoung();
	try {
		await obj.login(data.username, data.password);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json({message: error.message}, { status: 200, headers });
	}
	let books = await obj.getBooks();
	// await obj.download(books[0].value);

	if (!data.login) {
		return NextResponse.json(books, { status: 200, headers });
	}

	await obj.download(data.bookId);

	return NextResponse.json({message: "Nam Tam Bao"}, { status: 200, headers });
}