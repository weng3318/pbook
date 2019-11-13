import express from 'express'
import db from './db/database'
import member from './domain/member'
import login from './domain/login'
import session from 'express-session'
const router = express.Router()

var Member = new member()

//註冊
router.post('/register', (req, res, next) => {
    let Member = new member(req.body.name, req.body.email, req.body.password)
    let number_blank = "MR00000"
    let new_number =""
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
            console.log(rows);
            
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
                    db.query(`SELECT MAX(sid) FROM mr_information`,(err, data)=>{
                       new_number = number_blank.slice(0, -3)+  data[0]['MAX(sid)']
                    //    res.json(new_number)
                       db.query(Member.getAddMemberSql(new_number), (err, data) => {
                           if(err){
                               res.json({
                                   status: "伺服器錯誤，請稍後在試",
                                   message: "註冊失敗",
                                })
                               return;
                           }
                           // 若寫入資料庫成功，則回傳給clinet端下：
                           res.json({
                               status: "註冊成功",
                               message:"歡迎" + req.body.name + "的登入!",
                            })
                         })
                    })

                }
        })
    }
})

//登入
router.post('/login', (req, res, next) => {
    let Member = new login(req.body.email, req.body.password)
    
    db.query(Member.getLoginSql(), (err, rows) => {
        
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
            // res.locals.userId = rows[0].sid;
            // req.session.sid = res.locals.userId; 
            // console.log(req.session.sid);
            // console.log("req", req);
            //設定session
            req.session.memberId =  rows[0].MR_number
            console.log("session", req.session);           
            console.log("headers",req.headers);
            
            res.json({
                status:"登入成功",
                message:"歡迎" + rows[0].MR_name + "的登入!",
                info: rows[0]
            })
        }
    })

})


//查詢會員資料
router.post('/', (req, res, next)=>{
    let number = req.body.number
    db.query(Member.getMemberInfo(number), (err, rows)=>{
        res.send(rows)
    })
})


//修改會員資料
router.post('/edit', (req, res, next)=>{
    let number = req.body.number
    let email = req.body.email
    let name = req.body.name
    let nickname = req.body.nickname
    let birthday = req.body.birthday
    let mobile = req.body.mobile
    let address = req.body.address

    
    db.query(Member.modifyMemberInfoSql(number, email, name, nickname, birthday, mobile, address), (err, result)=>{
        if(err){ res.json(err) }
        res.json({
            status: "修改成功",
            message: "完成資料的更新"
        })
    })
})







//登出，清除session
router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/login')
})





module.exports = router;