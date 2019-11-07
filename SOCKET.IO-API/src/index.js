// 引入套件
const express = require('express')  //EXPRESS(建立路由使用)
const bluebird = require('bluebird'); //青鳥

const mysql = require('mysql');
// 設定資料庫連線
const db = mysql.createConnection({
    host: '192.168.27.186',
    user: 'root',
    password: 'root',
    database: 'pbook',
});
db.connect(); //資料庫連線
bluebird.promisifyAll(db);


const app = express()
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

users = [];
connections = [];

server.listen(process.env.PORT || 5000);
console.log('啟動socket io server 偵聽PORT 5000')

io.on('connection', function (socket) {
    console.log('有一個客戶端連接上了伺服器')
    // 客戶端一連接上就向資料庫拿取舊的聊天紀錄

    db.queryAsync("SELECT * FROM `test` WHERE 1")
        .then(results => {
            socket.emit('SeverToClientMsg', results)
            console.log('服務器接向客戶端發送消息', results);
        })
        .catch((error) => {
            socket.emit('資料庫維護中')
            console.log(error);
        })


    socket.on('clientToSeverMsg', function (data) {
        console.log('服務器接收到客戶端發送的消息', data)
    })
})

