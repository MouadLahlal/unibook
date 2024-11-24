import * as Minio from "minio";
import { pool } from "./db";
import * as crypto from "crypto";
import { env } from "process";

const bucket = "unibook";

let storage : Minio.Client | null = null;

if (env.MINIO_ENDPOINT && env.MINIO_PORT && env.MINIO_ACCESS_KEY && env.MINIO_SECRET_KEY) {
    storage = new Minio.Client({
        endPoint: env.MINIO_ENDPOINT || "",
        port: parseInt(env.MINIO_PORT || "") || 80,
        useSSL: env.MINIO_USESSL == "true" ? true : false,
        accessKey: env.MINIO_ACCESS_KEY || "",
        secretKey: env.MINIO_SECRET_KEY || "",
    });
}

storage
    ?.bucketExists(bucket)
    .then((res) => {
        if (!res) {
            storage!.makeBucket(bucket).catch((error) => {
                console.error(error);
            });
        }
    })
    .catch((error) => {
        console.error(error);
    });

const uploadBook = async (
    bookPath: string,
    originalBookName: string,
    thumbnail: string,
    account_id: string
) => {
    const randomName = crypto.randomBytes(16).toString("hex") + ".pdf";
    const idBook = crypto.randomUUID();
    const metadata = {
        "Content-Type": "application/pdf",
    };

    const createNewBook = async (bookName: string) => {
        const res = await pool?.any(
            "INSERT INTO files (id, account_id, original_filename, s3_filename, thumbnail, file_size, file_type) values ($1, $2, $3, $4, $5, $6, $7)",
            [idBook, account_id, bookName, randomName, thumbnail, 12, "pdf"]
        );
        return res;
    };

    await createNewBook(originalBookName).catch((error) => {
        console.error(error);
    });

    await storage?.fPutObject(bucket, randomName, bookPath, metadata);
};

export { storage, uploadBook };
