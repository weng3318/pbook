const express = require("express");
const url = require("url");
const mysql = require("mysql");
("body-parser");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
<<<<<<< HEAD
  // host: "localhost",
  host: "localhost",
  user: "opcp",
  password: "opcp2428",
=======
  // host: '192.168.27.186',
  host: '192.168.27.186',
  user: "root",
  password: "root",
>>>>>>> shan/master
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

//書本評分資料
router.get("/book_ratings", (req, res) => {
  const sql = `SELECT star,book FROM vb_ratings WHERE 1`;
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

//新增書評API
router.post("/book_reviews/:sid?/data", (req, res) => {
  let book = [];
  const newbook = {
    id: req.body.id,
    book: req.body.book,
    reviewText: req.body.reviewText,
    star: req.body.star
  };
  book.push(newbook);
  const sql = `INSERT INTO vb_ratings (member, book, star, message, create_time) VALUES ('${book[0].id}', '${book[0].book}', '${book[0].star}', '${book[0].reviewText}', NOW())`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.send("新增成功");
    }
  });
  console.log(book);
});

//書評資料
router.get("/memberReview/:book?", (req, res) => {
  let book = req.params.book;
  const sql = `SELECT vb_ratings.sid , vb_ratings.member , mr_level.MR_levelName,vb_ratings.message,vb_ratings.star,vb_ratings.book,mr_information.MR_nickname,book,mr_information.MR_pic,vb_ratings.create_time FROM mr_information,vb_ratings,mr_level WHERE mr_information.MR_number=vb_ratings.member AND mr_information.MR_personLevel=mr_level.MR_personLevel AND vb_ratings.book = ${book} ORDER BY vb_ratings.create_time ASC`;
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

//刪除書評API
router.delete("/deleteReview/:sid?", (req, res) => {
  let sid = req.params.sid;
  console.log(sid);
  const sql = `DELETE FROM vb_ratings WHERE vb_ratings.sid = ${sid}`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.send("刪除成功");
    }
  });
});

//更新書評API
router.put("/editReview/data", (req, res) => {
  let data = [];
  const reviews = {
    sid: req.body.sid,
    editReview: req.body.editReview
  };
  data.push(reviews);
  const sql = `UPDATE vb_ratings SET message = '${data[0].editReview}', update_time = NOW() WHERE vb_ratings.sid = ${data[0].sid}`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.send("更新成功");
    }
  });
  console.log(data);
});

//書評下方回復增加API
router.get("/reply", (req, res) => {
  const sql = `SELECT mr_information.MR_nickname,vb_reply.* FROM mr_information,vb_reply WHERE mr_information.MR_number = vb_reply.member ORDER BY vb_reply.create_time DESC`;
  db.query(sql, (error, results) => {
    if (error) {
      return res.send(error);
    } else {
      return res.json({
        reply: results
      });
    }
  });
});

module.exports = router;
