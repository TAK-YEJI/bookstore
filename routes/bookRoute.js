var express = require('express');
var router = express.Router();

const bookController = require('../controllers/book');
const book = new bookController();

/* GET bookPage */
router.get('/', book.bookPage);

/* GET book Detail Page */
router.get('/:book_id', book.bookDetailPage);

/* POST bookAdd. */
router.post('/bookAdd', book.bookAdd);

/* POST bookUpdate. */
router.post('/bookUpdate/:book_id', book.bookUpdate);

/* POST bookDelete. */
router.post('/bookDelete/:book_id', book.bookDelete);

/* GET book Update Page */
router.get('/bookUpdate/:book_id', book.bookUpdatePage);

module.exports = router;
