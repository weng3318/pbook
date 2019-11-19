// 引入套件
const express = require("express"); //EXPRESS(建立路由使用)
const gameWait = express.Router();
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


gameWait
    .route("/gameWait")
    .post(function (req, res) {
        console.log('gameWait', req.body.memberId);
        console.log('gameWait', req.body.startTime);

        db.queryAsync(
            `SELECT mb_gamewait.*,mr_information.MR_name,mr_information.MR_pic FROM mb_gamewait LEFT JOIN mr_information ON mr_information.MR_number = mb_gamewait.myTo WHERE mb_gamewait.myFrom = "${req.body.memberId}" AND mb_gamewait.created_at= "${req.body.startTime}"`
        )
            .then(results => {
                console.log('results', results);

                res.json(results)
            })
            .catch(error => {
                res.send("gameWait 404-找不到資料");
                console.log("gameWait錯誤", error);
            });
    });
module.exports = gameWait;

