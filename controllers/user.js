
const db = require("../middleware/db");
const pool = new db();

class user {
    /* signupAdd */
    async signup(req, res) {
        try {
            const user_id = req.body.signup_id;
            const user_pw = req.body.signup_pw;
            const user_name = req.body.signup_name;

            await pool.query('insert into user(user_id, user_pw, user_name) values(?, ?, ?)', [user_id, user_pw, user_name]);
         
            return res.send('<script type="text/javascript">alert("회원가입 완료!");location.href="/user/login";</script>');
            
        } catch (error) {
            console.log(error)
        }
    }

    /* signup Page */
    async signupPage(req, res) {
        try {

            return res.render('signup');

        } catch (error) {
            // return res.status(500).json(error);
            console.log(error);
        }
    }

    /* Log-in */
    async login(req, res) {
        try {

            const user_id = req.body.login_id;
            const user_pw = req.body.login_pw;
            
            const login = await pool.query('select * from user where user_id = ? AND user_pw', [user_id, user_pw])
            
            req.session.login_id = login[0].user_id;
            let sess = req.session.login_id;

            console.log(sess)

            return res.send('<script type="text/javascript">alert("로그인 완료!");location.href="/";</script>');

        } catch (error) {
            // return res.status(500).json(error);
            console.log(error);
        }
    }

    /* Log-in Page */
    async loginPage(req, res) {
        try {
    
            return res.render('login');
    
        } catch (error) {
            // return res.status(500).json(error);
            console.log(error);
        }
    }

    /* POST userUpdate */
    async userUpdate(req, res) {
        try {
            const user_id = req.body.user_id;
            const user_pw = req.body.user_pw;
            const user_name = req.body.user_name;

            await pool.query('update user set user_id = ?, user_pw = ?, user_name = ? where user_id = ? ', [user_id, user_pw, user_name, user_id]);

            return res.redirect('/mypage');
    
        } catch (error) {
            console.log(error)
        }
    }


    /* Log-out */
    async logout(req, res) {
        try {
            req.session.destroy(function(){
                req.session;
            });

            return res.send('<script type="text/javascript">alert("로그아웃 되셨습니다.");location.href="/";</script>');

        } catch (error) {
            // return res.status(500).json(error);
            console.log(error);
        }

    }


}

module.exports = user;