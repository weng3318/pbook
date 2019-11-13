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
async function sqlQuery(sql) {
    try {
        var data = await db.queryAsync(sql)
    } catch (err) {
        console.log(err);
    }
    return data
}

class AC {

    constructor(type = 'discount', id = 0) {
        this.acType = type
        this.acId = id
    }

    static async getOfflineList() {
        let sql = "SELECT * FROM `ac_pbook2`"
        return sqlQuery(sql)
    }

    static async getDiscountList() {
        let sql = "SELECT * FROM `pm_event2` WHERE `rule`=6"
        return sqlQuery(sql)
    }

    static async getOfflineById(acId) {
        let sql = "SELECT * FROM `ac_pbook2` WHERE `sid`=" + acId
        return sqlQuery(sql)
    }

    static async getDiscountById(acId) {
        let sql = "SELECT * FROM `pm_event` WHERE `sid`=" + acId
        let discount = await sqlQuery(sql)
        return discount[0]
    }

    static async getDiscountMember(acId) {
        let sql = "SELECT `user_level` FROM `pm_condition` WHERE `user_level` AND `event_id` =" + acId
        let members = await sqlQuery(sql)
        return members.map(v => v.user_level)
    }

    static async getDiscountBooksById(acId) {
        let sql = "SELECT * FROM `pm_books_group` WHERE `books_id` AND `event_id` =" + acId
        let books_id = await sqlQuery(sql)
        return books_id.map(v=>v.books_id)
    }

    static async getDiscountBooksByCate(acId, cpId = []) {
        let sql = "SELECT * FROM `pm_books_group` WHERE `categories_id` AND `event_id` =" + acId
        let cate_condition = await sqlQuery(sql)
        sql = "SELECT * FROM `vb_books` WHERE ( "
        // 限制分類
        for (let i = 0; i < cate_condition.length; i++) {
            sql += " `categories`=" + cate_condition[i].categories_id + " OR"
        }
        sql += " 0 )"
        // -------
        // 限制廠商
        sql += " AND ("
        for (let i = 0; i < cpId.length; i++) {
            sql += " `publishing`=" + cpId[i] + " OR"
        }
        sql += " 0 )"
        // -------
        let books = await sqlQuery(sql)
        return books.map(v => v.sid)
    }

    static async getDiscountCp(acId) {
        let sql = "SELECT `cp_id` FROM `pm_condition` WHERE `cp_id` AND `event_id` =" + acId
        let members = await sqlQuery(sql)
        return members.map(v => v.cp_id)
    }

}
module.exports = AC
