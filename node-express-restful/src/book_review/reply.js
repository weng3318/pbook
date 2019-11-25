const express = require("express");
const url = require("url");
const mysql = require("mysql");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
  // host: '192.168.27.186',
  host: "192.168.27.186",
  user: "root",
  password: "root",
  database: "pbook"
});
db.connect();
bluebird.promisifyAll(db);

router.post("/reply/InsertData", (req, res) => {
  let replyInsert = [];
  const text = {
    id: req.body.id,
    review_sid: req.body.review_sid,
    reply: req.body.reply
  };
  replyInsert.push(text);
  const sql = `INSERT INTO vb_reply (review_sid, member, reply_text, create_time) VALUES ( '${replyInsert[0].review_sid}', '${replyInsert[0].id}', '${replyInsert[0].reply}', NOW())`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.send("新增成功");
    }
  });
  console.log(replyInsert);
});

module.exports = router;
