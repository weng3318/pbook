const mysql = require('mysql')
const bluebird = require('bluebird')
const db = mysql.createConnection({
    host: '192.168.27.186',
    user: 'root',
    password: 'root',
    database: 'pbook',
})
db.connect();
bluebird.promisifyAll(db)

class AC {
    
    constructor(type='discount', id=0) {
        this.acType = type
        this.acId = id
    }

    static async getOfflineList() {
        let sql = "SELECT * FROM `ac_pbook2`"
        try {
            var data = await db.queryAsync(sql)
        } catch (err) {
            console.log(err);
        }
        return data
    }

    static async getDiscountList(){
        let sql = "SELECT * FROM `pm_event2`"
        try {
            var data = await db.queryAsync(sql)
        } catch (err) {
            console.log(err);
        }
        return data
    }
    
    static async getOfflineById(acId) {
        let sql = "SELECT * FROM `ac_pbook2` WHERE `id` =" + acId
        try {
            var data = await db.queryAsync(sql)
        } catch (err) {
            console.log(err);
        }
        return data
    }

    static async getDiscountById(acId) {
        let sql = "SELECT * FROM `pm_event2` WHERE `id` =" + acId
        try {
            var data = await db.queryAsync(sql)
        } catch (err) {
            console.log(err);
        }
        return data
    }

}
module.exports = AC
