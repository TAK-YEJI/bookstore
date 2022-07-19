const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const pool = require("../middleware/db");

class user {
    /* Sign-up */
    async signup(req, res, next) {
        try {
            const user_id = req.body.signup-id;
            const user_pw = req.body.signup-pw;
            const user_name = req.body.signup-name;

            await pool.query('insert into user(user_id, user_pw, user_name) values(?, ?, ?)', [user_id, user_pw, user_name]);
            // for (let allergy of allergy_name) {
            //     await pool.query('insert into allergy (user_id, allergy_name) values (?, ?)', [user_id, allergy])
            // }

            next();
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    /* Log-in */
    async login(req, res) {
        try {

            const user_id = req.body.user_id;
            const user_pw = req.body.user_pw;
            
            const login = await pool.query('select * from user where user_id = ? AND user_pw', [user_id, user_pw])

            next();

        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = user;