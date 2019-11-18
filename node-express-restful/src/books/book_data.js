const express = require("express");
const mysql = require("mysql");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pbook"
});
db.connect(error => {
  if (error) {
    return error;
  }
});
bluebird.promisifyAll(db);

router.get("/book_data/:page?/:categories?/:keyword?", (req, res) => {
  const output = {};
  const perPage = 8; // 每頁幾筆
  output.params = req.params; //可以在網址看params用
  output.perPage = perPage;
  let page = parseInt(req.params.page) || 1; //page預設1
  let keyword = req.params.keyword || ""; //search用
  let categories = req.params.categories || ""; 
  let where = " WHERE 1 ";
  if (keyword) {
    keyword = keyword.split("'").join("\\'"); // 避免 SQL injection
    where += " AND `name` LIKE '%" + keyword + "%' ";
    output.keyword = keyword; //可以在網址看keyword用
  }
  if (categories) {
    where += " AND `categories`" + " = " + categories;
    output.categories = categories;
  }
  let sql = "SELECT COUNT(1) `total` FROM `vb_books`" + where;
  console.log(sql);
  db.queryAsync(sql)
    .then(results => {
      output.totalRows = results[0]["total"];
      output.totalPage = Math.ceil(output.totalRows / perPage); //總頁數
      if (output.totalPage == 0) return;
      if (page < 1) page = 1;
      if (page > output.totalPage) page = output.totalPage;
      output.page = page;
      console.log("SELECT * FROM `vb_books` " + where + " LIMIT ?, ? ",
      [(page - 1) * perPage, perPage]);
      return db.queryAsync(
        "SELECT * FROM `vb_books` " + where + " LIMIT ?, ? ",
        [(page - 1) * perPage, perPage]
      );
    })
    .then(results => {
      output.rows = results;
      res.json(output);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
