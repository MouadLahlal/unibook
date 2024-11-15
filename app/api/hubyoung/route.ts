import { NextRequest, NextResponse } from "next/server";
import { HubYoung } from 'hub-young-downloader';
import { uploadBook } from "@/lib/storage";
import * as crypto from "node:crypto"
import { pool } from "@/lib/db";
import { env } from "node:process";

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

// export async function POST(request: NextRequest) {
// 	const data = await request.json();

// 	let obj = new HubYoung();

// 	try {
// 		await obj.login(data.username, data.password);
// 	} catch (error: any) {
// 		return NextResponse.json({message: error.message}, { status: 404, headers });
// 	}

// 	let books = await obj.getBooks();

// 	if (!data.login) {
// 		return NextResponse.json(books, { status: 200, headers });
// 	}

// 	await obj.download(data.bookId);

// 	const bookName = "LA matematica a colori - Edizione VERDE - Secondo biennio e quinto anno - Tomo A.pdf";

// 	uploadBook(bookName, bookName);

// 	return NextResponse.json({message: "Nam Tam Bao"}, { status: 200, headers });
// }

export async function POST(request: NextRequest) {
	const data = await request.json();
	const algorithm = 'aes-192-cbc';
	const password = env.CRYPTO_PSW || "";
	const salt = env.CRYPTO_SALT || "";
	const key = crypto.scryptSync(password, salt, 24);

	if (!password) {
		return NextResponse.json({ message: "Server error" }, { status: 504, headers });
	}

	const encrypt = () => new Promise<{ encrypted: string, iv: string }>((resolve, reject) => {
		let iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv(algorithm, key, iv);
		let encrypted_password = cipher.update(data.password, 'utf8', 'hex');
		encrypted_password += cipher.final('hex');

		resolve({ encrypted: encrypted_password, iv: iv.toString('hex') });
	});

	// const decrypt = (encryptedObj: {encrypted: string, iv: string}) => new Promise<string>((resolve, reject) => {
	// 	const { encrypted, iv } = encryptedObj;
	// 	const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
	// 	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	// 	decrypted += decipher.final('utf8');

	// 	resolve(decrypted);
	// });

	let encryptedData = await encrypt();
	// let decrypted_password = await decrypt(encryptedData);

	// console.log("Decrypted password:", decrypted_password);

	await pool.any("INSERT INTO platform_credentials (id, account_id, platform_name, platform_username, encrypted_password) values ($1, $2, $3, $4, $5)", [crypto.randomBytes(16).toString('hex'), "bellofigogu", "hubyoung", data.email, encryptedData]);

	return NextResponse.json({ messaggio: "damn" }, { status: 200, headers });
}