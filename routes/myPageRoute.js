var express = require('express');
var router = express.Router();

const myPageController = require('../controllers/myPage');
const myPage = new myPageController();

/* GET users myPage */
router.get('/', myPage.myPage);



module.exports = router;
