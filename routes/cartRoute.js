var express = require('express');
var router = express.Router();

const cartController = require("../controllers/cart");
const cart = new cartController();

/* GET cartPage */
router.get('/', cart.cartPage);

/* POST cartAdd. */
router.get('/cartAdd/:book_id', cart.cartAdd);

/* POST cartDelete. */
router.post('/cartDelete/:cart_id', cart.cartDelete);

/* Cart에 있는거 주문 */
router.post('/cartOrder/add', cart.cartOrder);

/* Cart에 있는 거 주문 페이지 */
router.post('/cartOrderPage/:cart_id', cart.cartOrderPage);

module.exports = router;