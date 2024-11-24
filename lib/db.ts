import pgPromise, { IDatabase } from "pg-promise";
import { env } from "process";

let pool: IDatabase<unknown> | null = null;

const pgp = pgPromise();
pool = pgp({
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT || "") || 5432,
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
});

// pool?.connect()
//     .then((obj) => {
//         obj.done();
//     })
//     .catch((error: Error) => {
//         console.error("Error: ", error);
//     });

export { pool };
