var express = require('express');
var router = express.Router();

const cardController = require('../controllers/card');
const card = new cardController();

/* POST cardAdd*/
router.post('/cardAdd', card.cardAdd);

/* POST cardUpdate. */
router.post('/cardUpdate', card.cardUpdate);

/* POST cardDelete. */
router.post('/cardDelete', card.cardDelete);

module.exports = router;