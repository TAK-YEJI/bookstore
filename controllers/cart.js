const { request } = require("express");
const httpStatus = require("http-status-codes");
const { add } = require("nodemon/lib/rules");
const db = require("../middleware/db");
const pool = new db();

class cart {
    /* GET cartPage */
    async cartPage(req, res) {
        try {
            let sess = req.session.login_id;

            const cart_id = await pool.query('select cart_id from cart where user_id = ?', [sess]);
            console.log(cart_id);

            const cart_info = await pool.query('select * from cart where cart_id = ?', [cart_id[0].cart_id]);
            console.log(cart_info);
        
            const book_info = await pool.query('select * from book join cartList on cartList.book_id = book.book_id');

            return res.render('cart', {  cart_info: cart_info, book_info: book_info, sess:sess});

        } catch (error) {
            return res.send('<script type="text/javascript">alert("현재 장바구니에 담긴 목록이 없습니다.");location.href="/";</script>');
        }
    }

    /* POST cartAdd */
    async cartAdd(req, res) {
        try {
            let sess = req.session.login_id;

            const { book_id } = req.params;
           
            const cart_info = await pool.query('select * from cart where user_id = ?', [sess]);

            if (cart_info.length == 0) {

                const cart_date = new Date();
                await pool.query('insert into cart values(?, ?, ?)', [null, cart_date, sess]);

                const cart_id = await pool.query('select cart_id from cart where cart_date = ?', [cart_date]);

                await pool.query('insert into cartList values(?, ?)', [cart_id[0].cart_id, book_id]);
            } else {
                let cart_list = cart_info[0];
                let cart_id = cart_list.cart_id;

                await pool.query('insert into cartList values(?, ?)', [cart_id, book_id]);
            }
            
            return res.send('<script type="text/javascript">alert("장바구니에 담기 완료!");location.href="/";</script>');

        } catch (error) {
            console.log(error)
        }
    }

    /* POST cartDelete */
    async cartDelete(req, res) {
        try {

            const sess = req.session.login_id;
            const cart_id = req.params.cart_id;

            await pool.query('delete from cartList where cart_id = ?', [cart_id]);
            await pool.query('delete from cart where cart_id = ? and user_id = ?', [cart_id, sess]);

            return res.redirect('/cart');
    
        } catch (error) {
            console.log(error)
        }
    }

    /* CartOrderPage */
    async cartOrderPage(req, res) {
        try {
            let sess = req.session.login_id;

            let { cart_id } = req.params;
            console.log(cart_id);

            const book_info = await pool.query('select * from book join cartList on cartList.book_id = book.book_id where cart_id = ?', [cart_id]);
            const card_info = await pool.query('select * from card where user_id = ?', [sess]);
            const address_info = await pool.query('select * from address where user_id = ?', [sess]);

            return res.render('order', {book_info: book_info, card_info: card_info, address_info: address_info, sess:sess});

        } catch (error) {
            
        }
    }

    /* Cart에 있는거 Order */
    async cartOrder(req, res) {
        try {
            let sess = req.session.login_id;

            const book_id = await pool.query('select * from book join cart on cart.book_id = book.book_id');

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

            for (book of book_id) {
                await pool.query('insert into mydb.orderList values(?, ?, ?)', [order_amount, order_id[0].order_id, book.book_id]);
            }

            return res.redirect('/order/orderList');
        } catch (error) {
            
        }
    }

}

module.exports = cart;