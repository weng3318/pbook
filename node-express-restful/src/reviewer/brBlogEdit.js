import express from 'express'
import db from './db/database'

const router = express.Router()
const bluebird = require("bluebird");
bluebird.promisifyAll(db);

// like路徑參考
// app.use("/member", require("./src/member/member"));
//寄發EMAIL #POSTMAN測試
import nodemailer from 'nodemailer'
router.post('/sendPwd', (req, res)=>{
    let email = req.body.email
    // console.log(email);
    let sql = `SELECT * FROM mr_information WHERE MR_email = '${email}'`
    db.query(sql, (err, row)=>{
        console.log(row);
        
        if(! row.length){
            return res.json({
                status: '寄送失敗',
                message: '這個信箱還未註冊過'
            })
        }
        console.log(123);
        let token = row[0].tokenId;
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user: 'dragonqoo1988@gmail.com',
                pass: '29894199',
            
            }
        })
        let mailOptions = {
            form: '"品書網"<dragonqoo1988@gmail.com>',
            to: `${email}`,
            subject: '重設密碼',
            html: `<h1>親愛的品書會員您好:</h1><br><h3>請點擊下方進行重新設定密碼</h3><br><a href="http://localhost:3000/ResetPWD/${token}"><h2>重設密碼頁</h2></a>`
        }
        transporter.sendMail(mailOptions, (err, info)=>{
            // console.log(info);
            res.json({
                status: '傳送成功',
                message: '請到信箱修改密碼'
                })
            })
    })
})


//修改會員資料 #接過來的資料
router.post('/edit', (req, res, next)=>{
    let number = req.body.number
    let email = req.body.email
    let name = req.body.name
    let nickname = req.body.nickname
    let birthday = req.body.birthday
    let mobile = req.body.mobile
    let address = req.body.address
    let filename = req.body.filename

    
    db.query(Member.modifyMemberInfoSql(number, email, name, nickname, birthday, mobile, address, filename), (err, result)=>{
        if(err){ res.json(err) }
        res.json({
            status: "修改成功",
            message: "完成資料的更新"
        })
    })
})