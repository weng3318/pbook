const mysql = require('mysql')
const bluebird = require('bluebird')
const db = mysql.createConnection({
    host: 'localhost',
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
        // 取得書籍資訊
        sql = "SELECT * FROM `vb_books` WHERE ( "
        for (let i = 0; i < books_id.length; i++) {
            sql += " `sid`=" + books_id[i].books_id + " OR"
        }
        sql += " 0 )"
        let books = await sqlQuery(sql)
        return books
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
        return books
    }

    static async getDiscountCp(acId) {
        let sql = "SELECT `cp_id` FROM `pm_condition` WHERE `cp_id` AND `event_id` =" + acId
        let members = await sqlQuery(sql)
        return members.map(v => v.cp_id)
    }

    static async getDiscountAmount(acId) {
        let sql = "SELECT `type`, `discounts` FROM `pm_general_discounts` WHERE `event_id`=" + acId
        let discountAmount = await sqlQuery(sql)
        return discountAmount[0]
    }

    // 取得折價活動所有資訊
    static async getDiscountAllBooks(acId) {
        let discount = {}
        // 取得活動資訊
        let info = await AC.getDiscountById(acId)
        // 取得適用會員
        discount.member = +info.user_level ? await AC.getDiscountMember(acId) : [1, 2, 3, 4, 5, 6]
        // 取得適用書籍
        if (info.group_type === 0) {
            discount.books = []
        } else if (info.group_type === 1) {
            let cpId = await AC.getDiscountCp(acId)
            discount.books = await AC.getDiscountBooksByCate(acId, cpId)
        } else {
            discount.books = await AC.getDiscountBooksById(acId)
        }
        // 取得折價金額
        discount.amount = await AC.getDiscountAmount(acId)
        discount.info = `member: 適用會員。\nbooks: 適用書籍。\namount: 折價 O %。\nmember與books若為空陣列代表全部適用 `
        return discount
    }

    // 取得特定書籍的折價
    static async getBookDiscount(book_id, memberLevel = 1) {
        let discount = 0
        let discountList = await AC.getDiscountList()
        discountList = discountList.filter(v => v.rule === 6 && v.status === 1).map(v => v.sid)
        for (let i = 0; i < discountList.length; i++) {
            let acId = discountList[i]
            let discountAllBooks = await AC.getDiscountAllBooks(acId)
            let books = discountAllBooks.books.map(v => v.sid)
            // [(如果全書籍皆適用，或者，傳入之書籍適用此活動)
            // 而且(此會員適用此項活動)]
            // 而且(當前活動折價比上次高)
            // 就把折價設為當前折價
            if ((books.length === 0 || books.indexOf(+book_id) !== -1)
                && discountAllBooks.member.indexOf(+memberLevel) !== -1) {

                if (discountAllBooks.amount.discounts > discount) {
                    discount = discountAllBooks.amount.discounts
                }
                // console.log(acId, discount, discountAllBooks.amount.discounts, books)
            }
        }
        return { discount, type: 6 }
    }

    // 對某階級會員，取得所有書籍折價資訊
    static async getBooksDiscountForMemberLevel(memberLevel) {
        let sql = "SELECT `sid` FROM `vb_books` WHERE 1"
        let allBooks = await sqlQuery(sql)
        for (let i = 0; i < allBooks.length; i++) {
            let { discount, type } = await AC.getBookDiscount(+allBooks[i].sid, +memberLevel)
            allBooks[i].discount = discount
            allBooks[i].type = type
        }
        return allBooks
    }

}
module.exports = AC
