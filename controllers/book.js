const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class book {
    /* GET book Page */
    async bookPage(req, res) {
        try {
            let sess = req.session.login_id;

            return res.render('book', {sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

    /* GET book detail Page */
    async bookDetailPage(req, res) {
        try {
            let sess = req.session.login_id;

            let { book_id } = req.params;

            const book_info = await pool.query('select * from book where book_id = ?', [book_id]);

            return res.render('bookdetail', {book_info: book_info, sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

    /* POST bookAdd */
    async bookAdd(req, res) {
        try {
            // let user_id = req.session.login_id;

            let book_id = req.body.book_id;
            let book_title = req.body.book_title;
            let book_writer = req.body.book_writer;
            let book_publisher = req.body.book_publisher;
            let book_price = req.body.book_price;
            let book_stock = req.body.book_stock;


            await pool.query('insert into book(book_id, book_title, book_writer, book_publisher, book_price, book_stock) values(?, ?, ?, ?, ?, ?)', [book_id, book_title, book_writer, book_publisher, book_price, book_stock]);

            return res.redirect('/');

        } catch (error) {
            console.log(error)
        }
    }

    /* GET book Update Page */
    async bookUpdatePage(req, res) {
        try {
            let sess = req.session.login_id;

            let { book_id } = req.params;

            const book_info = await pool.query('select * from book where book_id = ?', [book_id]);


            return res.render('bookupdate', {book_info: book_info, sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

    /* POST bookUpdate */
    async bookUpdate(req, res) {
        try {

            let { book_id } = req.params;

            const book_info = await pool.query('select * from book where book_id = ?', [book_id]);

            let book_title = req.body.book_title;
            let book_writer = req.body.book_writer;
            let book_publisher = req.body.book_publisher;
            let book_price = req.body.book_price;
            let book_stock = req.body.book_stock;

            await pool.query('update book set book_id = ?, book_title = ?, book_writer = ?, book_publisher = ?, book_price = ?, book_stock = ? where book_id = ? ', [book_id, book_title, book_writer, book_publisher, book_price, book_stock, book_id]);

            return res.render('bookdetail', {book_info: book_info});
    
        } catch (error) {
            console.log(error)
        }
    }

    /* POST bookDelete */
    async bookDelete(req, res) {
        try {

            let { book_id } = req.params;
            console.log(book_id);

            await pool.query('delete from book where book_id = ?', [book_id]);

            return res.redirect('/');
    
        } catch (error) {
            console.log(error)
        }
    }
    

}

module.exports = book;