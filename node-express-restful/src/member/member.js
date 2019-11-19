import express from 'express'
import db from './db/database'
import member from './domain/member'
import login from './domain/login'
const router = express.Router()
const bluebird = require("bluebird");
bluebird.promisifyAll(db);

var Member = new member()

//註冊
router.post('/register', (req, res, next) => {
    let Member = new member(req.body.name, req.body.email, req.body.password, req.body.filename)
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
            // console.log(rows);
            
                // 如果有重複的email
                if(rows.length >=1){
                    res.json({
                        status: "註冊失敗",
                        message: "已有重複的Email。"
                     })
                     return
                }else{

                    db.query(`SELECT MAX(sid) FROM mr_information`,(err, data)=>{
                       new_number = number_blank.slice(0, -3)+ (data[0]['MAX(sid)']+1)
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
                               message:"歡迎" + req.body.name + "的加入!",
                            })
                         })
                    })

                }
        })
    }
})

//寄發EMAIL
import nodemailer from 'nodemailer'
router.post('/sendPwd', (req, res)=>{
    let email = req.body.email
    console.log(email);
    let sql = `SELECT * FROM mr_information WHERE MR_email = '${email}'`
    db.query(sql, (err, row)=>{
        let uusid = row[0].sid;
        console.log(uusid);
        
        if(email === ''){
            
            return res.json({
                status: '傳送失敗',
                message: '請輸入正確的信箱'
            })
        }
        
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
            html: `<h1>親愛的品書會員您好:</h1><br><h3>請點擊下方進行重新設定密碼</h3><br><a href="http://localhost:3000/ResetPWD/${uusid}"><h2>重設密碼頁</h2></a>`
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

//用sid查詢email，再去修改密碼
router.post('/queryEmail', (req, res, next)=>{
    let sid = req.body.sid
    let sql = `SELECT MR_number FROM mr_information WHERE sid = '${sid}'`
    db.query(sql, (err, row)=>{
        res.json({
            number: row[0]
        })
    })
})

//取書櫃書籍資料
router.post('/queryBookcase', (req,res)=>{
    let number = req.body.number
    console.log(number);
    
    db.query(Member.queryBooks(number), (err, rows)=>{
        res.json(rows)
    })

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
            //設定session
            // 在session內塞memberData物件，用來存放會員資料
            req.session.memberData = {
                memberId: rows[0].MR_number,
                memberLv: rows[0].MR_personLevel,
            } 
            // console.log(req.session);
            
            res.json({
                status:"登入成功",
                message:"歡迎" + rows[0].MR_name + "的登入!",
                info: rows[0],
            })
        }
    })

})

//查詢分類
router.get('/categories', (req, res, next)=>{
    db.query(Member.queryCategories(), (err, row)=>{
        res.json({
            row
        })
    })
})

//修改會員密碼
router.post('/changePassword', (req, res, next)=>{
    let number = req.body.number
    let password = req.body.password
    // console.log(number, password);
    
    db.query(Member.changePassword(number,password), (err, row)=>{

        if(err) return res.json({err: err})
        // console.log(row);
        if(row.changedRows == 0){

            res.json({
                status: "修改密碼失敗",
                message: "會員編號有誤"
            })
            return
        }
        else{
            res.json({
                status: "修改密碼成功",
                message: "完成密碼更新"
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
    let filename = req.body.filename

    
    db.query(Member.modifyMemberInfoSql(number, email, name, nickname, birthday, mobile, address, filename), (err, result)=>{
        if(err){ res.json(err) }
        res.json({
            status: "修改成功",
            message: "完成資料的更新"
        })
    })
})


//新增會員書籍
router.post('/addBook', (req, res)=>{
    let isbn = req.body.isbn
    let name = req.body.name
    let author = req.body.author
    let publishing = req.body.publishing
    let publishDate = req.body.publishDate
    let version = req.body.version
    let price = req.body.price
    let pages = req.body.pages
    let savingStatus = req.body.savingStatus
    let memberNo = req.body.memberNo
    let categories = req.body.categories
    let remark = req.body.remark
    let imgs = req.body.imgs

    db.query(Member.addMemberBoos(isbn, name, author, publishing, 
        publishDate, version, price, pages, savingStatus, memberNo, imgs, 
        categories, remark), (err, row)=>{
            console.log(row);
            if(row == undefined){
                res.json({
                    status: "上架書籍失敗",
                    message: "資訊有誤"
                })
                return
            }
            else{
                res.json({
                    status: "上架書籍成功",
                    message: "可以參加配對活動"
                })
            }
    })
})


//前端上傳圖片單張
const multer =require('multer')
const upload =multer({dest:'tmp_uploads/'})
const fs = require('fs')
router.post('/upload', upload.single('avatar'),(req, res) =>{
        console.log("avatar",  req.body.avatar);
        if(req.file && req.file.mimetype){
            console.log(req.file)
            switch(req.file.mimetype){
                case 'image/png':
                case 'image/jpeg':
                    fs.createReadStream(req.file.path)
                        .pipe(
                            fs.createWriteStream('public/images/member/' + req.file.originalname)
                        )
                        // console.log(req.file.filename);
                        
                        res.json({
                           filename: req.file.originalname
                        })
                        break;
                default:
                    return res.send('bad file type')
            }
        }else{
            res.json({
                filename: ""
            })
        }
    })


//前端上傳圖片多張
//API用POSTMAN測試可以
router.post('/imgFiles', upload.array('avatar', 5 ),(req, res, next) =>{
        console.log("avatar",  req.body);
        console.log("Files", req.files.length); 
        
        let images = []
        for(let i=0; i<req.files.length;i++){
            if(req.files[i] && req.files[i].mimetype){
                // console.log([i]);
                switch(req.files[i].mimetype){
                        case 'image/png':
                        case 'image/jpeg':
                            fs.createReadStream(req.files[i].path)
                                .pipe(
                                    fs.createWriteStream('public/images/memberBooks/' + req.files[i].originalname)
                                )
                                images.push( req.files[i].originalname)
                                // console.log(images);            
                                continue;
                                default:
                                return res.send('bad file type')
                        }
                            
            }else{
                    console.log('222');
                    res.json({
                        pictures: images
                    })
            }
        }
        console.log("images", images);
        
        res.json({
            message: "上傳成功",
            pictures: images
        })
        
    })




module.exports = router;