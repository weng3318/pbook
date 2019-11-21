const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" }); //圖片上傳
const fs = require("fs"); //檔案處理
const moment = require("moment-timezone");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "pbook"
});
db.connect();
const bluebird = require("bluebird");
bluebird.promisifyAll(db);

//精選文章
router
  .route("/homepage/")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    let output = {};
    let sql =
      "SELECT * FROM `fm_article` article JOIN `vb_categories` vb ON article.`fm_category` = vb.`sid` JOIN `mr_information` mr ON article.`fm_memberId`=mr.`MR_number` WHERE article.`fm_featured`=1 ORDER BY RAND() LIMIT 5";
    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      output.featured = results;
      res.json(output);
    });
  });

//文章列表
router
  .route("/articleList/:number")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    let number = req.params.number;
    let output = {};
    let sql =
      "SELECT * FROM `fm_article` article JOIN `vb_categories` vb ON article.`fm_category` = vb.`sid` JOIN `mr_information` mr ON article.`fm_memberId`=mr.`MR_number` LIMIT " +
      number;
    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      // output.featured = results;
      res.json(results);
    });
  });

//card1 讀取作者資料
router
  .route("/homepage/:memberId/:category")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    let memberId = req.params.memberId;
    let category = req.params.category;
    let sql =
      "SELECT * FROM `mr_information`JOIN `vb_categories` ON `vb_categories`.sid='" +
      category +
      "' WHERE `MR_number`= '" +
      memberId +
      "'";
    // res.json(sql);
    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      res.json(results);
    });
  });

//讀取文章
router
  .route("/article/:articleId")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    let articleId = req.params.articleId;
    let output = {};
    let sql =
      "SELECT * FROM `fm_article` JOIN  vb_categories vb ON vb.sid=`fm_category` JOIN fm_subCategories sub ON sub.sid= `fm_subCategories` WHERE `fm_articleId`='" +
      articleId +
      "'";
    db.queryAsync(sql)
      .then(result => {
        output.article = result[0];
        sql =
          "SELECT * FROM `mr_information` WHERE `MR_number`='" +
          result[0].fm_memberId +
          "'";
        return db.queryAsync(sql);
      })
      .then(result => {
        output.member = result[0];
        res.json(output);
      });
  });

//分類文章
router
  .route("/cate/:number/:subCate?")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    let output = {};
    let number = req.params.number;
    let subCate = req.params.subCate;
    let sql =
      "SELECT * FROM `fm_article` WHERE `fm_featured`='1' AND `fm_category`='" +
      number +
      "'";
    db.queryAsync(sql)
      .then(results => {
        output.featured = results;
        sql = "SELECT * FROM `fm_article` WHERE `fm_category`='" + number + "'";
        return db.queryAsync(sql);
      })
      .then(results => {
        output.article = results;
        sql =
          "SELECT * FROM `fm_subcategories` WHERE `fm_categories`='" +
          number +
          "'";
        return db.queryAsync(sql);
      })
      .then(results => {
        output.subcategory = results;
        res.json(output);
      });
  });

//發表新文章
router
  .route("/postNew")
  .all((req, res, next) => {
    next();
  })
  .get((req, res) => {
    res.send("get");
  })
  .post(upload.array("imgFile[]"), (req, res) => {
    console.log("post article");
    let resData = {};
    let data = req.body;
    let articleId = +new Date() + data.MR_number;
    let filename = "";
    let mainImg = "";
    // res.json(req.files);

    if (data.imgCount === '0') {
      mainImg = Math.floor(Math.random() * 10) + 1 + "0.jpg";
    }
    for (let i = 0; i < data.imgCount; i++) {
      console.log("123312");
      if (req.files[i] && req.files[i].mimetype) {
        filename = articleId + i + "." + req.files[i].mimetype.slice(6, 10);
        if (i === 0) {
          mainImg = filename;
        }

        switch (req.files[i].mimetype) {
          case "image/png":
          case "image/jpeg":
            fs.createReadStream(req.files[i].path).pipe(
              fs.createWriteStream(
                "public/images/forum/article_key/" + filename
              )
            );
            resData.filename = filename;
            break;
          default:
            return res.send("bad file type");
        }
      } else {
        resData.filename = "no img file";
      }
    }

    let category = data.cate;
    let subCategories = data.subcate;
    let title = data.title;
    let subTitle = data.textareaValue[0].slice(0,200);
    let demoImage = mainImg;
    let content = {
      element: data.element,
      textareaValue: data.textareaValue
    };
    fs.writeFile(
      __dirname + "/../../public/forum/content/" + articleId + ".json",
      JSON.stringify(content),
      error => {
        if (error) return console.log(error);
      }
    );
    let memberId = data.MR_number;
    const timeFormat = "YYYY-MM-DD  HH:mm:ss";
    let time = moment(new Date()).format(timeFormat);
    // res.json(time);
    resData.content = content;
    let sql =
      "INSERT INTO `fm_article`(`fm_articleId`, `fm_category`, `fm_subCategories`, `fm_title`, `fm_subTitle`, `fm_demoImage`, `fm_content`, `fm_memberId`, `fm_featured`, `fm_like`, `fm_read`, `fm_publishTime`, `fm_updateTime`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,NOW() )";

    db.query(
      sql,
      [
        articleId,
        category,
        subCategories,
        title,
        subTitle,
        demoImage,
        articleId + ".json",
        memberId,
        1,
        1,
        1,
        time
      ],
      (error, results, fields) => {
        if (error) throw error;
        if (results.affectedRows === 1) {
          resData.message = true;
        } else {
          resData.message = false;
        }
        res.json(resData);
      }
    );
  });

// router.route("/homepage/:id?").get((req, res) => {
//   let output = {};
//   let sql = "SELECT * FROM `fm_article` WHERE `fm_featured`= 1";
//   db.queryAsync(sql)
//     .then(result => {
//       output.article = result;
//       console.log(result)
//       sql =
//         "SELECT * FROM `mr_information` WHERE `MR_number`= '" +
//         result[0].fm_memberId +
//         "'";
//       return db.queryAsync(sql);
//     })
//     .then(results => {
//       output.user = results[0];
//       res.json(output);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });

module.exports = router;
