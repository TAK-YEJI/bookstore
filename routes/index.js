var express = require('express');
var router = express.Router();

const mainRoute = require('./mainRoute');
const userRoute = require('./usersRoute');
const myPageRoute = require('./myPageRoute');
const cardRoute = require('./cardRoute');
const addressRoute = require('./addressRoute');
const bookRoute = require('./bookRoute');
const orderRoute = require('./orderRoute');
const cartRoute = require('./cartRoute');

router.use('/', mainRoute);
router.use('/user', userRoute);
router.use('/myPage', myPageRoute);
router.use('/card', cardRoute);
router.use('/address', addressRoute);
router.use('/book', bookRoute);
router.use('/order', orderRoute);
router.use('/cart', cartRoute);

module.exports = router;