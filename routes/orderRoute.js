var express = require('express');
var router = express.Router();

const orderController = require("../controllers/order");
const order = new orderController();

/* GET order Page */
router.get('/page/:book_id', order.orderPage);

/*POST orderAdd */
router.post('/orderAdd/:book_id', order.orderAdd);

/* GET order List Page */
router.get('/orderList', order.orderListPage);

/* POST orderListDelete */
router.post('/orderListDelete',order.orderListDelete);

/* GET order Status Page */
router.get('/orderReturn', order.orderReturnPage);


module.exports = router;