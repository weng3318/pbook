import express from 'express'
import db from '../db/database'
import member from '../domain/member'
const router = express.Router()


router.post('/register', (req, res, next) => {
    let Member = new member(req.body.name, req.body.email, req.body.password)

    //驗證email格式
    if(Member.checkEmail(req.body.email) === false){
        res.json({
            status: "註冊失敗。",
            err: "請輸入正確的Eamil格式"
        })
        return
    }else{

        // 尋找是否有重複的email
        db.query(Member.queryEmail(), (err, rows) => {
                if(err){
                    res.status(404).json({
                       message: "伺服器錯誤，請稍後在試！"
                    })
                }
                // 如果有重複的email
                if(rows.length >=1){
                    res.json({
                        status: "註冊失敗",
                        message: "已有重複的Email。"
                     })
                     return
                }else{
                    db.query(Member.getAddMemberSql(), (err, data) => {
                        if(err){
                            res.json({
                                status: "已伺服器錯誤，請稍後在試",
                                message: "註冊失敗"
                             })
                            return;
                        }
                        // 若寫入資料庫成功，則回傳給clinet端下：
                        res.json({
                            message: "註冊成功"

                         })
                      })
                }
        })
    }
})

module.exports = router;