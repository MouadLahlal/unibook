import { pool } from "@/lib/db";
import { storage } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function GET(request: NextRequest) {

	const formatBooks = async (books: any) => await Promise.all(
		books.map(async (book: any) => {
			let presigned = await storage.presignedUrl("GET", "unibook", book.s3_filename, 24*60*60);
			return ({
				name: book.original_filename,
				thumbnail: book.thumbnail,
				url: presigned
			});
	}));

	let books = await formatBooks(await pool.any("SELECT * FROM files WHERE account_id = $1", [request.cookies.get("auth_token")?.value || ""]));

	return NextResponse.json({ books }, { status: 200, headers });
}