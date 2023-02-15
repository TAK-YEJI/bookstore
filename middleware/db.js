const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "blue023577",
    port: 3306,
    database: "mydb",
});

class db {
    async query(sql, args) {
        return new Promise(async (resolve, reject) => {
            // Arrow Function
            try {
                // Check to connection of database
                const conn = await pool.getConnection()

                // 정규표현식 : Regular Expression
                // const query = xss.encode(args)
                // console.log(query)

                const [rows, fields] = await pool.query(sql, args)

                conn.release()

                resolve(rows)
            } catch(err) {
                console.error(err)

                resolve([])
            }
        })
    }
}

module.exports = db;