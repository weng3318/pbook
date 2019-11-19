const express = require("express");
const mysql = require("mysql");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
  host: "192.168.27.186",
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
  const output = {};
  let where = " WHERE 1 ";
  let sql = "SELECT COUNT(1) `total` FROM `vb_ratings`" + where;
  // console.log("SELECT * FROM `vb_ratings`" + where );
  db.queryAsync(sql)
    .then(results => {
      output.total = results[0]["total"];
      return db.queryAsync("SELECT * FROM `vb_ratings`" + where );
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
