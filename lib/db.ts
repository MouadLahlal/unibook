import pgPromise, { IDatabase } from "pg-promise";

let pool: IDatabase<unknown> | null = null;

const pgp = pgPromise();
pool = pgp({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "") || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// pool?.connect()
//     .then((obj) => {
//         obj.done();
//     })
//     .catch((error: Error) => {
//         console.error("Error: ", error);
//     });

export { pool };
