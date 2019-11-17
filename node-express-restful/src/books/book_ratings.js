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

router.get("/book_ratings", (req, res) => {
  let where = " WHERE 1 ";
  let sql = "SELECT * FROM `vb_ratings`" + where;
  db.queryAsync(sql)
    .then(results => {
      res.json(results);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
