// 引入套件
const express = require("express"); //EXPRESS(建立路由使用)
const countDown = express.Router();
const bluebird = require("bluebird"); //青鳥
const _ = require("lodash"); //loadsh,處理數據的各種方法


const mysql = require("mysql");
// 設定資料庫連線
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pbook"
});
db.connect(); //資料庫連線

bluebird.promisifyAll(db);


countDown
    .route("/countDown")
    .post(function (req, res) {
        console.log('pairedMemberBooksUpdate', req.body.memberId);
        db.queryAsync(
            `SELECT GameCreatedTime FROM mb_gamelist WHERE MR_number = "${req.body.memberId}"`
        )
            .then(results => {
                res.json(results);
            })
            .catch(error => {
                res.send("countDown 404-找不到資料");
                console.log("countDown錯誤",error);
            });
    });
module.exports = countDown;

