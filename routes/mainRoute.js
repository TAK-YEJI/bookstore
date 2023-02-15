var express = require('express');
var router = express.Router();

const mainController = require("../controllers/main");
const main = new mainController();

/* main page */
router.get('/', main.mainPage)

router.get('/test', main.test);

router.post('/bookSearch', main.search)

module.exports = router;