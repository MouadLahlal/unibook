import pgPromise, { IDatabase } from "pg-promise";

let pool: IDatabase<unknown> | null = null;

// const isBuild: boolean = process.env.IS_BUILD === "true";

// if (!isBuild) {
//     pool = pgPromise()({
//         host: "db",
//         port: 5432,
//         database: "postgres",
//         user: "postgres",
//         password: "admin",
//     });

//     pool?.connect()
//         .then((obj) => {
//             obj.done();
//         })
//         .catch((error: Error) => {
//             console.error("Error: ", error);
//         });
// } else {
//     console.log("Skipping db connection during build");
// }

pool = pgPromise()({
    host: "157.27.163.217",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "admin",
});

pool?.connect()
    .then((obj) => {
        obj.done();
    })
    .catch((error: Error) => {
        console.error("Error: ", error);
    });

export { pool };
