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

app.use(cors());


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));


app.use("/member", require('./src/member/member'))
app.use("/forum", require("./src/forum/homepage"));
app.use("/nana_use", require("./src/nana_use/chatList"));
app.use("/nana_use", require("./src/nana_use/chatMessage"));
app.use("/books", require(__dirname + '/src/books/book_categories') )
app.use('/activities', require('./src/activities/acApi'))


app.get("/", function(req, res) {
  res.send("Home");
});

app.use("/forum", require("./src/forum/homepage"));

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
