const express = require("express");
const mysql = require("mysql");
const bluebird = require("bluebird");
const router = express.Router();
const db = mysql.createConnection({
  host:"localhost",
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

router.get("/book_ratings/", (req, res) => {
  let fiveStars = [],
    fourStars = [],
    threeStars = [],
    twoStars = [],
    oneStars = [],
    max = [],
    min = [],
    avg = [];
  const output = {};
  let where = " WHERE 1 ";
  let sql = "SELECT COUNT(1) `total` FROM `vb_ratings`" + where;
  // console.log("SELECT * FROM `vb_ratings`" + where );
  db.queryAsync(sql)
    .then(results => {
      output.total = results[0]["total"];
      return db.queryAsync("SELECT * FROM `vb_ratings`" + where);
    })
    .then(results => {
      //計算每本書各星數有幾筆
      for (let j = 0; j <= 124; j++) {
        fiveStars[j] = 0;
        fourStars[j] = 0;
        threeStars[j] = 0;
        twoStars[j] = 0;
        oneStars[j] = 0;
        for (let i = 0; i < output.total; i++) {
          if (results[i].book == j) {
            switch (results[i].star) {
              case 5:
                fiveStars[j]++;
                break;
              case 4:
                fourStars[j]++;
                break;
              case 3:
                threeStars[j]++;
                break;
              case 2:
                twoStars[j]++;
                break;
              case 1:
                oneStars[j]++;
                break;
              default:
                break;
            }
          }
        }
      }
      for (let j = 0; j <= 124; j++) {
        avg[j] = (
          (fiveStars[j] * 5 +
            fourStars[j] * 4 +
            threeStars[j] * 3 +
            twoStars[j] * 2 +
            oneStars[j]) /
          (fiveStars[j] +
            fourStars[j] +
            threeStars[j] +
            twoStars[j] +
            oneStars[j])
        ).toFixed(1);
        max[j] = fiveStars[j];
        min[j] = fiveStars[j];
        if (fourStars[j] > max[j]) max[j] = fourStars[j];
        else if (fourStars[j] < min[j]) min[j] = fourStars[j];

        if (threeStars[j] > max[j]) max[j] = threeStars[j];
        else if (threeStars[j] < min[j]) min[j] = threeStars[j];

        if (twoStars[j] > max[j]) max[j] = twoStars[j];
        else if (twoStars[j] < min[j]) min[j] = twoStars[j];

        if (oneStars[j] > max[j]) max[j] = oneStars[j];
        else if (oneStars[j] < min[j]) min[j] = oneStars[j];
      }
      output.fiveStars = fiveStars;
      output.fourStars = fourStars;
      output.threeStars = threeStars;
      output.twoStars = twoStars;
      output.oneStars = oneStars;
      output.max = max;
      // output.min = min;
      output.avg = avg;
      // console.log(output);
      res.json(output);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
