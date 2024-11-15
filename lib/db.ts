import pgPromise from 'pg-promise';

const pool = pgPromise()({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'admin'
});

pool.connect()
    .then((obj) => {
        console.log("Connected to db");
        obj.done();
    })
    .catch((error) => {
        console.error("Error: ", error);
    });

export {
    pool
}