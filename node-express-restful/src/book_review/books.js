const express = require("express");
const url = require("url");
const mysql = require("mysql");
("body-parser");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
  // host: "192.168.27.186",
  host: "192.168.27.186",
  user: "shan",
  password: "opcp2428",
  database: "pbook"
});
db.connect();
bluebird.promisifyAll(db);

//書本單筆資料
router.get("/book_reviews/:sid?", (req, res) => {
  let sid = req.params.sid;
  console.log(req.query.id);
  const sql = `SELECT * FROM vb_books WHERE sid=${sid}`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

router.post("/book_reviews/:sid?/data", (req, res) => {
  let book = [];
  const newbook = {
    id: req.body.id,
    book: req.body.book,
    reviewText: req.body.reviewText
  };
  book.push(newbook);
  const sql = `INSERT INTO vb_ratings (member, book, star, message, create_time) VALUES ('${book[0].id}', '${book[0].book}', '3', '${book[0].reviewText}', NOW())`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.send("新增成功");
    }
  });
  console.log(book);
});

router.get("/memberReview/:book?", (req, res) => {
  let book = req.params.book;
  const sql = `SELECT mr_information.MR_number , vb_ratings.member , vb_ratings.message,vb_ratings.star,vb_ratings.book,mr_information.MR_nickname,book,mr_information.MR_pic,vb_ratings.create_time FROM mr_information,vb_ratings WHERE mr_information.MR_number=vb_ratings.member AND vb_ratings.book = ${book} ORDER BY vb_ratings.create_time DESC`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.json({
        reviews: results
      });
    }
  });
});

module.exports = router;
