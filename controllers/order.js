const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class order {
    /* GET orderPage */
    async orderPage(req, res) {
        try {

            let sess = req.session.login_id;

            const { book_id } = req.params;

            const book_info = await pool.query('select * from book where book_id = ?', [book_id]);
            const card_info = await pool.query('select * from card where user_id = ?', [sess]);
            const address_info = await pool.query('select * from address where user_id = ?', [sess]);

            return res.render('order', {book_info: book_info, card_info: card_info, address_info: address_info, sess:sess});

        } catch (error) {
            console.log(error)
        }
    }


    /* POST order */
    async orderAdd(req, res) {
        try {

            let sess = req.session.login_id;

            const { book_id } = req.params;

            const order_total = req.body.order_total;
            const order_date = new Date();
            const order_amount = req.body.order_amount;

            const address_post = req.body.address_post;
            const address_info = await pool.query('select * from address where address_post = ?', [address_post]);
            const address_default = address_info[0].address_default;
            const address_detail = address_info[0].address_detail;

            const card_id = req.body.card_id;
            const card_info = await pool.query('select * from card where card_id = ?', [card_id]);
            const card_expiration_period = card_info[0].card_expiration_period;
            const card_type = card_info[0].card_type;

            await pool.query('insert into mydb.order values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [null, order_total, order_date, sess, address_post, address_default, address_detail, card_id, card_expiration_period, card_type]);

            const order_id = await pool.query('select order_id from mydb.order where order_date = ?' , [order_date]);
            console.log(order_id);

            await pool.query('insert into mydb.orderList values(?, ?, ?)', 
            [order_amount, order_id[0].order_id, book_id]);

            return res.redirect('/order/orderList');

        } catch (error) {
            console.log(error)
        }
    }

    /* GET order List Page */
    async orderListPage(req, res) {
        try {
            let sess = req.session.login_id;

            const order_info = await pool.query('select * from mydb.order where user_id = ?', [sess]);
            const order_list_info = await pool.query('select * from mydb.orderList join mydb.order on mydb.order.order_id = mydb.orderList.order_id');
            const return_amount = req.body.return_amount;

            return res.render('orderList', {order_info: order_info, order_list_info: order_list_info, sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

    /* POST orderListDelete */
    async orderListDelete(req, res) {
        try {
            const order_id = req.body.order_id;

            console.log(order_id);

            await pool.query('delete from mydb.orderList where order_id = ?', [order_id]);
            await pool.query('delete from mydb.order where order_id = ?', [order_id]);

            return res.redirect('/order/orderList');
            

        } catch (error) {
            
        }
    }

      /* GET orderReturnPage */
      async orderReturnPage(req, res) {
        try {

            let sess = req.session.login_id;

            const { book_id } = req.params;

            const book_info = await pool.query('select * from book where book_id = ?', [book_id]);
            const card_info = await pool.query('select * from card where user_id = ?', [sess]);
            const address_info = await pool.query('select * from address where user_id = ?', [sess]);
            const order_info = await pool.query('select * from order where order_id = ?', [order_id]);

            return res.render('/order/orderReturn', {book_info: book_info, card_info: card_info, address_info: address_info, order_info: order_info, sess:sess});

        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = order;