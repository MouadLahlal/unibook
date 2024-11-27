export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        try {
            const fs = await import("fs/promises");
            const pgPromise = await import("pg-promise");
            const pgp = pgPromise.default();
            const pool = pgp({
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || "") || 5432,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
            });
            const sql = await fs.readFile('./schema.sql', 'utf8');
            pool.any(sql);
            console.log("database changed");
            // pgp.end();
        } catch (error) {}
    }
}