const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "Ruby",
  password: "1010",
  database: "pbook"
});
db.connect();
const bluebird = require("bluebird");
bluebird.promisifyAll(db);

// router
//   .route("/homepage/")
//   .all((req, res, next) => {
//     next();
//   })
//   .get((req, res) => {
//     let sql = "SELECT * FROM `fm_article` WHERE `fm_featured`=1";
//     db.queryAsync(sql, (error, results, fields) => {
//       if (error) throw error;
//       res.json(results);
//     });
//     db.query(sql, (error, results, fields) => {
//       if (error) throw error;
//       res.json(results);
//     });
//   });

router.route("/homepage/:id?").get((req, res) => {
  let output = {};
  let sql = "SELECT * FROM `fm_article` WHERE `fm_featured`=1";
  db.queryAsync(sql)
    .then(result => {
      output.article = result[0];
      sql =
        "SELECT * FROM `mr_information` WHERE `MR_number`= '" +
        result[0].fm_memberId +
        "'";
      return db.queryAsync(sql);
    })
    .then(results => {
      output.user = results[0];
      res.json(output);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
