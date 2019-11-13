// 引入套件
const express = require("express"); //EXPRESS(建立路由使用)
const countDown = express.Router();
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


countDown
    .route("/countDown")
    .get(function (req, res) {
        req.session.memberId = "MR00001";
        if (req.session.memberId === undefined) {
            res.send("找不到資料");
        }
        db.queryAsync(
            `SELECT created_at FROM mb_gamelist WHERE 1`
        )
            .then(results => {
                var date = results[0]['created_at']
                var time = date.getTime()
                res.json(time);
            })
            .catch(error => {
                res.send("404-找不到資料");
                console.log(error);
            });
    });
module.exports = countDown;

