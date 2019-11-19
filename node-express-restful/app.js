import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

const app = express();
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "192.168.27.186",
  user: "root",
  password: "root",
  database: "pbook"
});
db.connect();

const bluebird = require("bluebird");
bluebird.promisifyAll(db);

//預設的 Access-Control-Allow-Origin 是 * (代表全部瀏覽器都可以查看資料)
//設定指定的瀏覽器才能連線
const whitelist = ["http://localhost:3000", undefined, "http://localhost:5000"]; //若要使用同一台伺服器需使用undefined而不是直接填url(node.js設定問題)
const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    console.log("origin: " + origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
};
app.use(cors(corsOptions));

const session = require("express-session");
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};

// 設定session的middleware
app.use(
  session({
    store: new FileStore(fileStoreOptions),
    //新用戶沒有使用到session物件時不會建立session和發送cookie
    saveUninitialized: false,
    resave: true,
    secret: "yoko0509",
    cookie: {
      maxAge: 120000000000000000000000000 //單位毫秒
    }
  })
);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.use("/member", require("./src/member/member"));
app.use("/forum", require("./src/forum/homepage"));

// 太多了!!有空我會整理一下...
// nana聊天室用
app.use("/nana_use", require("./src/nana_use/chatList2"));
app.use("/nana_use", require("./src/nana_use/chatMessage2"));
app.use("/nana_use", require("./src/nana_use/myDataList2"));
app.use("/nana_use", require("./src/nana_use/myBooks"));
// nana遊戲用
app.use("/nana_use", require("./src/nana_use/pairedMemberBooks"));
app.use("/nana_use", require("./src/nana_use/pairedMemberBooksInsert"));
app.use("/nana_use", require("./src/nana_use/pairedMemberBooksUpdate"));
app.use("/nana_use", require("./src/nana_use/pairedMemberBooksOld"));
app.use("/nana_use", require("./src/nana_use/gameWait"));
app.use("/nana_use", require("./src/nana_use/gameWaitCheck"));
app.use("/nana_use", require("./src/nana_use/gameWaitInsert"));
app.use("/nana_use", require("./src/nana_use/ResetChance"));
app.use("/nana_use", require("./src/nana_use/countDown"));

app.use("/books", require(__dirname + '/src/books/book_categories'));
app.use("/books", require(__dirname + '/src/books/book_data'));
app.use("/books", require(__dirname + '/src/books/book_ratings'));
app.use('/activities', require('./src/activities/acApi'))
app.use('/reviews', require('./src/book_review/reviews'))

//下面三行有衝突我先註解掉
app.use('/reviews', require('./src/book_review/books'))
app.use('/reviewer', require('./src/reviewer/brReviewerList'))
app.use('/reviewer', require('./src/reviewer/brBookcase'))
app.use('/reviewer', require('./src/reviewer/brBooks'))


app.get("/", function(req, res) {
  res.send("Home");
});

//登出
app.get("/logout", (req, res) => {
  //清除session的memberData
  delete req.session.memberData;
  // console.log("logout success", req.session);
  return res.redirect("/");
});

//if we are here then the specified request is not found
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//all other requests are not implemented.
app.use((err, req, res, next) => {
  res.status(err.status || 501);
  res.json({
    error: {
      code: err.status || 501,
      message: err.message
    }
  });
});

module.exports = app;
