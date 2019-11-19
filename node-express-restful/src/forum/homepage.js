const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
const upload = multer({ dest: "tmp_uploads/" });
const fs = require("fs");
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
      "SELECT * FROM `fm_article` article JOIN `vb_categories` vb ON article.`fm_category` = vb.`sid` JOIN `mr_information` mr ON article.`fm_memberId`=mr.`MR_number` WHERE article.`fm_featured`=1 ";
    db.query(sql, (error, results, fields) => {
      if (error) throw error;
      output.featured = results;
      console.log(results);
      res.json(output);
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
  .post(upload.array("imgfile"), (req, res) => {
    console.log(req.file);
    if (req.file && req.file.mimetype) {
      switch (req.files[0].mimetype) {
        case "image/png":
        case "image/jpeg":
          fs.createReadStream(req.files[0].path).pipe(
            fs.createWriteStream(
              "public/images/forum/article_key/" + req.files[0].originalname
            )
          );
          res.json({
            filename: req.files[0].originalname
          });
          break;
        default:
          return res.send("bad file type");
      }
    } else {
      res.json({
        filename: ""
      });
    }
    // let resData = {};
    // let data = req.body;
    // let articleId = +new Date() + data.MR_number;
    // let category = data.cate;
    // let subCategories = data.subcate;
    // let title = data.title;
    // let subTitle = JSON.parse(data.textareaValue)[0];
    // let demoImage = articleId + ".jpg";
    // // let content = JSON.parse(data.element);
    // // let contentFile = articleId;
    // let content = data.element;
    // let memberId = data.MR_number;
    // res.send("1223");

    // let sql =
    //   "INSERT INTO `fm_article`(`fm_articleId`, `fm_category`, `fm_subCategories`, `fm_title`, `fm_subTitle`, `fm_demoImage`, `fm_content`, `fm_memberId`, `fm_featured`, `fm_like`, `fm_read`, `fm_publishTime`, `fm_updateTime`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW() ,NOW() )";
    // db.query(
    //   sql,
    //   [
    //     articleId,
    //     category,
    //     subCategories,
    //     title,
    //     subTitle,
    //     demoImage,
    //     content,
    //     memberId,
    //     1,
    //     1,
    //     1
    //   ],
    //   (error, results, fields) => {
    //     if (error) throw error;
    //     if (results.affectedRows === 1) {
    //       resData.message = true;
    //     } else {
    //       resData.message = false;
    //     }
    //     res.json(resData);
    //   }
    // );
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
