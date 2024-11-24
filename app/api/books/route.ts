import { pool } from "@/lib/db";
import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

type Book = {
	original_filename: string,
	s3_filename: string,
	thumbnail: string
}

export async function GET(request: NextRequest) {

	const formatBooks = async (books: Array<Book>) => await Promise.all(
		books.map(async (book: Book) => {
			const presigned = await storage?.presignedUrl("GET", "unibook", book.s3_filename, 24*60*60);
			return ({
				name: book.original_filename,
				thumbnail: book.thumbnail,
				url: presigned
			});
	}));

	const user = request.headers.get("x-user-id");

	const res = await pool?.any("SELECT * FROM files WHERE account_id = $1", [user]);

	let books = null;

	if (res) {
		books = await formatBooks(res);
	}

	return NextResponse.json({ books }, { status: 200, headers });
}