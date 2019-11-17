// 引入套件
const express = require("express"); //EXPRESS(建立路由使用)
const chatMessage = express.Router();
const bluebird = require("bluebird"); //青鳥
const _ = require("lodash"); //loadsh,處理數據的各種方法


const mysql = require("mysql");
// 設定資料庫連線
const db = mysql.createConnection({
    host: "192.168.27.186",
    user: "root",
    password: "root",
    database: "pbook"
});
db.connect(); //資料庫連線

bluebird.promisifyAll(db);

chatMessage
    .route("/chatMessage")
    .get(function (req, res) {
        if (req.session.memberData.memberId === undefined) {
            res.send("找不到session.memberId");
        } else {
            db.queryAsync(
                `SELECT * FROM mb_chat WHERE myFrom = "${req.session.memberData.memberId}" OR myTo = "${req.session.memberData.memberId}" ORDER BY created_at DESC`
            )
                .then(results => {
                    console.log('message final',results);
                    
                    res.json(results);
                })
                .catch(error => {
                    res.send("404-找不到資料");
                });

        }
    });
module.exports = chatMessage;







