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

//bookData
router.get("/book_data/:page?/:categories?/:keyword?", (req, res) => {
  let fiveStars = [],
    fourStars = [],
    threeStars = [],
    twoStars = [],
    oneStars = [],
    max = [],
    min = [],
    avg = [];
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
    where += " AND `vb_books`.`name` LIKE '%" + keyword + "%' ";
    output.keyword = keyword; //可以在網址看keyword用
  }
  if (categories) {
    where += " AND `vb_books`.`categories`" + " = " + categories;
    output.categories = categories;
  }
  let sql =
    "SELECT COUNT(1) `total` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid` LEFT JOIN `vb_ratings` ON `vb_books`.`sid`=`vb_ratings`.`book`" +
    where;
  db.queryAsync(sql)
    .then(results => {
      output.total = results[0]["total"]; //給下面計算用的ratings總筆數
      return db.queryAsync("SELECT COUNT(1) `total` FROM `vb_books`" + where);
    })
    .then(results => {
      output.totalRows = results[0]["total"]; //總筆數
      output.totalPage = Math.ceil(output.totalRows / perPage); //總頁數
      if (output.totalPage == 0) return;
      if (page < 1) page = 1;
      if (page > output.totalPage) page = output.totalPage;
      output.page = page;
      return db.queryAsync(
        "SELECT `vb_books`.*,`cp_data_list`.`cp_name` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid`" +
          where +
          " LIMIT ?, ? ",
        [(page - 1) * perPage, perPage]
      );
    })
    .then(results => {
      output.rows = results;
      return db.queryAsync(
        "SELECT `vb_books`.*,`cp_data_list`.`cp_name`,`vb_ratings`.`star` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid` LEFT JOIN `vb_ratings` ON `vb_books`.`sid`=`vb_ratings`.`book`" +
          where
      );
    })
    .then(results => {
      //計算每本書每個星星共有幾筆
      if (page !== output.totalPage) {
        for (let j = 0; j < output.perPage; j++) {
          fiveStars[j] = 0;
          fourStars[j] = 0;
          threeStars[j] = 0;
          twoStars[j] = 0;
          oneStars[j] = 0;
          for (let i = 0; i < output.total; i++) {
            if (output.rows[j].sid == results[i].sid) {
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
        for (let j = 0; j < output.perPage; j++) {
          avg[j] = +(
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
        for (let j = 0; j < output.perPage; j++) {
          output.rows[j].fiveStars = fiveStars[j];
          output.rows[j].fourStars = fourStars[j];
          output.rows[j].threeStars = threeStars[j];
          output.rows[j].twoStars = twoStars[j];
          output.rows[j].oneStars = oneStars[j];
          output.rows[j].max = max[j];
          output.rows[j].avg = avg[j];
        }
      } else if (page == output.totalPage) {
        for (let j = 0; j < output.totalRows % output.perPage; j++) {
          fiveStars[j] = 0;
          fourStars[j] = 0;
          threeStars[j] = 0;
          twoStars[j] = 0;
          oneStars[j] = 0;
          for (let i = 0; i < output.total; i++) {
            if (output.rows[j].sid == results[i].sid) {
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
        for (let j = 0; j < output.totalRows % output.perPage; j++) {
          avg[j] = +(
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
        for (let j = 0; j < output.totalRows % output.perPage; j++) {
          output.rows[j].fiveStars = fiveStars[j];
          output.rows[j].fourStars = fourStars[j];
          output.rows[j].threeStars = threeStars[j];
          output.rows[j].twoStars = twoStars[j];
          output.rows[j].oneStars = oneStars[j];
          output.rows[j].max = max[j];
          output.rows[j].avg = avg[j];
        }
      }
      res.json(output);
    })
    .catch(error => {
      console.log(error);
    });
});

//bookInfo
router.get("/book_info/:sid?", (req, res) => {
  let fiveStars = [],
    fourStars = [],
    threeStars = [],
    twoStars = [],
    oneStars = [],
    max = [],
    min = [],
    avg = [];
  const output = {};
  let sid = req.params.sid || "";
  let where = " WHERE 1 ";
  if (sid) {
    where += " AND `vb_books`.`sid`" + " = " + sid;
    output.sid = sid;
  }
  let sql =
    "SELECT COUNT(1) `total` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid` LEFT JOIN `vb_categories` ON `vb_books`.`categories`= `vb_categories`.`sid` LEFT JOIN `vb_ratings` ON `vb_books`.`sid`=`vb_ratings`.`book`" +
    where;
  db.queryAsync(sql)
    .then(results => {
      output.totalRatings = results[0]["total"]; //給下面計算用的ratings總筆數
      return db.queryAsync(
        "SELECT  COUNT(1) `total` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid` LEFT JOIN `vb_categories` ON `vb_books`.`categories`= `vb_categories`.`sid`" +
          where
      );
    })
    .then(results => {
      output.total = results[0]["total"];
      return db.queryAsync(
        "SELECT `vb_books`.*,`cp_data_list`.`cp_name`,`vb_categories`.`categoriesName` FROM `vb_books` LEFT JOIN `cp_data_list` ON `vb_books`.`publishing` = `cp_data_list`.`sid` LEFT JOIN `vb_categories` ON `vb_books`.`categories`= `vb_categories`.`sid`" +
          where
      );
    })
    .then(results => {
      output.rows = results;
      return db.queryAsync(
        "SELECT `vb_books`.*,`vb_ratings`.`star` FROM `vb_books` LEFT JOIN `vb_ratings` ON `vb_books`.`sid`=`vb_ratings`.`book`" +
          where
      );
    })
    .then(results => {
      //計算每本書每個星星共有幾筆

      for (let j = 0; j < output.total; j++) {
        fiveStars[j] = 0;
        fourStars[j] = 0;
        threeStars[j] = 0;
        twoStars[j] = 0;
        oneStars[j] = 0;
        for (let i = 0; i < output.totalRatings; i++) {
          if (output.rows[j].sid == results[i].sid) {
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
      for (let j = 0; j < output.total; j++) {
        avg[j] = +(
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
      for (let j = 0; j < output.total; j++) {
        output.rows[j].fiveStars = fiveStars[j];
        output.rows[j].fourStars = fourStars[j];
        output.rows[j].threeStars = threeStars[j];
        output.rows[j].twoStars = twoStars[j];
        output.rows[j].oneStars = oneStars[j];
        output.rows[j].max = max[j];
        output.rows[j].avg = avg[j];
      }

      res.json(output);
    })
    .catch(error => {
      console.log(error);
    });
});
//categories
router.get("/book_categories/:keyword?", (req, res) => {
  // const output = {};
  // output.params = req.params; 可以在網址看params用
  let keyword = req.params.keyword || ""; //search用
  let where = " WHERE 1 ";
  if (keyword) {
    keyword = keyword.split("'").join("\\'"); // 避免 SQL injection
    where += " AND `name` LIKE '%" + keyword + "%' ";
    // output.keyword = keyword; 可以在網址看keyword用
  }
  let sql = "SELECT * FROM `vb_categories`" + where;
  // console.log(sql);
  db.queryAsync(sql)
    .then(results => {
      // output.catagories = results;
      res.json(results);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
