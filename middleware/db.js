const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "blue023577",
    port: 3306,
    database: "mydb",
});

module.exports = pool;