var express = require('express');
var router = express.Router();

const addressController = require('../controllers/address');
const address = new addressController();

/* POST addressAdd. */
router.post('/addressAdd', address.addressAdd);

/* POST addressUpdate. */
router.post('/addressUpdate', address.addressUpdate);

/* POST addressDelete. */
router.post('/addressDelete', address.addressDelete);

module.exports = router;
