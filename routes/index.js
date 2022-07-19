var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('main', { title: '예Zl문go' });
});

/* login page */
router.get('/login', function(req, res) {
  res.render('login');
});

/* signup page */
router.get('/signup', function(req, res) {
  res.render('signup');
});

module.exports = router;