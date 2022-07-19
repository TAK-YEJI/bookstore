var express = require('express');
var router = express.Router();

const userController = require("../controllers/user");
const user = new userController();

/* GET users listing. */
router.post('/signup', user.signup, function(req, res, next) {
  res.send('<script type="text/javascript">alert("회원가입 완료!");location.href="/login";</script>');
});

module.exports = router;
