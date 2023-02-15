const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const order = require("./order");
const pool = new db();

class main {
    /* main */
    async mainPage(req, res) {
        try {
            
            let sess = req.session.login_id;

            const book_info = await pool.query('select * from book');
            const order_info = await pool.query('select * from mydb.order where user_id = ?', [sess])

            return res.render('main', { book_info: book_info, order_info: order_info, title: '예Zl문go', sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

    /* test */
    async test(req, res) {
        try {

            let sess = req.session.login_id;

            const book_info = await pool.query('select * from book');
            
            return res.render('test',{ book_info: book_info, sess: sess});
        } catch (error) {
            console.log(error)
        }
    }

    async search(req, res) {
        let sess = req.session.user_id

        const book_title = req.body.book_title;

        const book_info = await pool.query('select * from book where book_title like ?', ['%' + book_title + '%'])
        console.log(book_info);

        return res.render('main', { book_info: book_info, title: '예Zl문go', sess: sess})
    }

}

module.exports = main;