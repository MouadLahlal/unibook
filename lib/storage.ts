import * as Minio from 'minio';
import { pool } from './db';
import * as crypto from "crypto";
import { env } from "process";
import { existsSync, lstat, statSync } from 'fs';

const bucket = 'unibook';

const storage = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT || "",
    port: 80,
    useSSL: false,
    accessKey: env.MINIO_ACCESS_KEY || "",
    secretKey: env.MINIO_SECRET_KEY || "",
});

storage.bucketExists(bucket)
    .then((res) => {
        if (!res) {
            storage.makeBucket(bucket).catch((error) => {
                console.error(error);
            })
        }
    })
    .catch((error) => {
        console.error(error);
    });

const uploadBook = async (bookPath: string, originalBookName: string, thumbnail: string) => {
    const randomName = crypto.randomBytes(16).toString('hex') + '.pdf';
	const idBook = crypto.randomUUID();
    const metadata = {
		'Content-Type': 'application/pdf'
	};

    const createNewBook = async (bookName: string) => {
		const res = await pool.any("INSERT INTO files (id, original_filename, s3_filename, thumbnail, file_size, file_type) values ($1, $2, $3, $4, $5, $6)", [idBook, bookName, randomName, thumbnail, 12, "pdf"]);
		return res;
	}
	
	await createNewBook(originalBookName).catch((error) => {
		console.error(error);
	});

    const checkFileReady = (filePath: string) => {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
            if (existsSync(filePath)) {
                const stats = statSync(filePath);
                if (stats.size > 0) {
                    clearInterval(interval);
                    resolve(true);
                }
            }
            }, 100);
        });
    };

    await checkFileReady(bookPath);

	await storage.fPutObject(bucket, randomName, bookPath, metadata);
}

export {
    storage,
    uploadBook
}