const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class address {
    /* POST addressAdd */
    async addressAdd(req, res) {
        try {
            let user_id = req.session.login_id;

            let address_post = req.body.address_post;
            let address_default = req.body.address_default;
            let address_detail = req.body.address_detail;

            await pool.query('insert into address(address_post, address_default, address_detail, user_id) values(?, ?, ?, ?)', [address_post, address_default, address_detail, user_id]);

            return res.redirect('/myPage');

        } catch (error) {
            console.log(error)
        }
    }

    /* POST addressUpdate */
    async addressUpdate(req, res) {
        try {

            let user_id = req.session.login_id;

            let address_post = req.body.address_post;
            let address_default = req.body.address_default;
            let address_detail = req.body.address_detail;

            await pool.query('update address set address_post = ?, address_default = ?, address_detail  = ? where user_id = ?', [address_post, address_default, address_detail, user_id]);

            return res.redirect('/myPage');
    
        } catch (error) {
            console.log(error)
        }
    }

    /* POST addressDelete*/
    async addressDelete(req, res) {
        try {

            let address_post = req.body.address_post;

            await pool.query('delete from address where address_post = ?', [address_post]);

            return res.redirect('/myPage');
    
        } catch (error) {
            console.log(error)
        }
    }
    
}

module.exports = address;