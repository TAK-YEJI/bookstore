const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class card {
      /* POST cardAdd */
      async cardAdd(req, res) {
        try {
            let user_id = req.session.login_id;

            let card_id = req.body.card_id;
            let card_expiration_period = req.body.card_expiration_period;
            let card_type = req.body.card_type;

            await pool.query('insert into card(card_id, card_expiration_period, card_type, user_id) values(?, ?, ?, ?)', [card_id, card_expiration_period, card_type, user_id]);

            return res.redirect('/mypage');

        } catch (error) {
            console.log(error)
        }
    }

    /* POST cardUpdate */
    async cardUpdate(req, res) {
        try {
            let user_id = req.session.login_id;

            let card_id = req.body.card_id;
            let card_expiration_period = req.body.card_expiration_period;
            let card_type = req.body.card_type;

            await pool.query('update card set card_id = ?, card_expiration_period = ?, card_type = ? where user_id = ? ', [card_id, card_expiration_period, card_type, user_id]);

            return res.redirect('/mypage');
    
        } catch (error) {
            console.log(error)
        }
    }

    /* POST cardDelete*/
    async cardDelete(req, res) {
        try {

            let card_id = req.body.card_id;

            await pool.query('delete from card where card_id = ?', [card_id]);

            return res.redirect('/mypage');
    
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = card;