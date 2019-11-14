var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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


app.get('/', function (req, res) {
    res.send('socket首頁')
});

var users = []
io.sockets.on('connection', function (socket) {
    // console.log(socket);
    console.log('有一個客戶端連接上了伺服器')
    // console.log(socket.handshake.query);
    // console.log(socket.handshake.query.myID);
    users.push(socket.handshake.query.myID)
    // console.log('users', users);
    var result = users.filter(function (element, index, arr) {
        return arr.indexOf(element) === index;
    });
    var result2 = result.filter(function (element, index, arr) {
        return arr.indexOf("假資料") !== index;
    })
    console.log('result2', result2);

    socket.on('clientToSeverMsg', async function (data) {
        console.log('服務器接收到客戶端發送的消息', data)

        await db.queryAsync(`UPDATE mb_chat SET myRead = 1 WHERE chat_id = "${data.chat_id}" AND myTo = "${data.myFrom}"`)
        console.log('1');


        await db.queryAsync(`INSERT INTO mb_chat(chat_id, myFrom, myTo, content, myRead, created_at) VALUES ("${data.chat_id}","${data.myFrom}","${data.myTo}","${data.content}","${data.myRead}","${data.created_at}")`)
        console.log('2');

        for (var i = 0; i < result2.length; i++) {
            console.log('3');
            if (result2[i] === data.myFrom || result2[i] === data.myTo) {
                console.log('4');
                if (result2[i] === data.myFrom) {
                    console.log('5');
                    var results = await db.queryAsync(`SELECT mb_chat.*,MR_number,MR_name,MR_pic FROM mb_chat LEFT JOIN mr_information ON MR_number = myTo OR MR_number = myFrom WHERE myFrom = "${result2[i]}" OR myTo = "${result2[i]}" ORDER BY created_at ASC`)
                    console.log('6');

                    // 一開始拿的資料,MR_number有塞我的跟對方的,為了讓MR_number是塞對方的資料,所以要先篩選一次
                    var Without_MY_MR_number = [];
                    results.forEach(function (value, index) {
                        if (value.MR_number !== result2[i]) {
                            Without_MY_MR_number.push(value);
                        }
                    });

                    console.log(Without_MY_MR_number);

                    // 去除重複的chat_id(因為同樣的兩位只需開一個對話框)
                    var myResult = {};
                    var finalResult = [];
                    for (var i = 0; i < Without_MY_MR_number.length; i++) {
                        myResult[Without_MY_MR_number[i].chat_id] = Without_MY_MR_number[i];
                        //Without_MY_MR_number[i].chat_id不能重复,達到去重效果,這裡必須知道"chat_id"或是其他键名
                    }

                    var item = [];
                    //现在result内部都是不重复的对象了，只需要将其键值取出来转为数组即可
                    for (item in myResult) {
                        finalResult.push(myResult[item]);
                    }

                    mapResult = finalResult;
                    console.log('7');

                    var results2 = await db.queryAsync(`SELECT * FROM mb_chat WHERE myTo = "${result2[i]}" AND myRead = 0`)

                    mapResult.forEach(function (value, index) {
                        value.total = 0;
                        for (var i = 0; i < results2.length; i++) {
                            if (value.MR_number === results2[i].myFrom) {
                                value.total++;
                            }
                        }
                    })
                    console.log('8');
                    console.log('最後一次', mapResult);

                    socket.emit('SeverToClientMsg', { oldDataList: mapResult, data: data })
                    // io.sockets.emit('SeverToClientMsg', { oldDataList: mapResult, data: data })
                    // socket.broadcast.emit('SeverToClientMsg', { oldDataList: mapResult, data: data })
                }
            }
        }

    })
})


http.listen(5000, function () {
    console.log('listening on *:5000');
});


// db.queryAsync("SELECT * FROM `test` WHERE 1")
//     .then(results => {
//         socket.emit('SeverToClientMsg', results)
//         console.log('服務器接向客戶端發送消息', results);
//     })
//     .catch((error) => {
//         socket.emit('資料庫維護中')
//         console.log(error);
//     })