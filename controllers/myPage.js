const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class myPage {
    /* GET myPage */
    async myPage(req, res) {
        try {
            let user_id = req.session.login_id;

            let user_info = await pool.query('select * from user where user_id = ?', [user_id]);
            let card_info = await pool.query('select * from card where user_id = ?', [user_id]);
            let address_info = await pool.query('select * from address where user_id = ?', [user_id]);
            
            let sess = req.session.login_id;

            return res.render('myPage', {user_info: user_info, address_info: address_info, card_info: card_info, sess: sess});

        } catch (error) {
            // return res.status(500).json(error);
            console.log(error);
        }
    }


    
}

module.exports = myPage;