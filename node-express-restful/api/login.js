import express from 'express'
import db from '../db/database'
import login from '../domain/login'
const router = express.Router()

router.post('/login', (req, res, next) => {
    let Member = new login(req.body.email, req.body.password)
    
    db.query(Member.getLoginSql(), (err, rows) => {
        // console.log(rows);
        
        if( rows.length == 0){
            res.json({
                status:"登入失敗",
                message:"請輸入正確的帳號或密碼"
            })
            return
        }else if(err){
            res.json({
                status:"登入失敗",
                message:"伺服器錯誤，請稍後在試！"
            })
            return
        }else{
            res.locals.userId = rows[0].sid;
            //設定session
            req.session.sid = res.locals.userId; 
            // console.log(req.session.sid);

            res.json({
                status:"登入成功",
                message:"歡迎" + rows[0].MR_name + "的登入!",
                info: rows[0]
            })
        }
    })

})

module.exports = router


