import express from 'express'
import db from '../db/database'
import login from '../domain/login'
const router = express.Router()

router.post('/login', (req, res, next) => {
    console.log(1);
    let Member = new login(req.body.email, req.body.password)
    console.log(2);
    console.log(Member.getLoginSql());
    
    db.query(Member.getLoginSql(), (err, rows) => {
        console.log(rows);
        
        if( rows.length == 0){
            res.json({
                status:"登入失敗",
                message:"沒有此帳號"
            })
            return
        }else if(err){
            res.json({
                status:"登入失敗",
                message:"伺服器錯誤，請稍後在試！"
            })
            return
        }else{
            res.json({
                status:"登入成功",
                message:"歡迎你回來"
            })
        }
    })

})
    // router.post('/', function(req, res){

    // })

module.exports = router


