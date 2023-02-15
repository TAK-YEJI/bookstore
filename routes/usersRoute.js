var express = require('express');
var router = express.Router();

const userController = require("../controllers/user");
const user = new userController();

/* POST signup. */
router.post('/signup', user.signup)

/* GET signupPage */
router.get('/signup', user.signupPage)

/* POST login. */
router.post('/login', user.login)

/* GET login. */
router.get('/login', user.loginPage)

/* POST userUpdate */
router.post('/userUpdate', user.userUpdate)

/* GET logout. */
router.get('/logout', user.logout)


module.exports = router;
