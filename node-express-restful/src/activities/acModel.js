import { db, sqlQuery } from './connectDB'

class AC {

    constructor(type = 'discount', id = 0) {
        this.acType = type
        this.acId = id
    }

    static async memberSidMapArray() {
        let sql = 'SELECT `MR_number`, `sid` FROM `mr_information` WHERE 1'
        let memberSidMapArray = {}
        let memberArray = await sqlQuery(sql)
        memberArray.forEach(v => {
            memberSidMapArray[v.MR_number] = v.sid
        })
        return memberSidMapArray
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
        let sql = "SELECT * FROM `pm_event2` WHERE `sid`=" + acId
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
        sql = "SELECT * FROM `vb_books` WHERE 1 "
        // 限制分類
        let cate_sql_string = '('
        for (let i = 0; i < cate_condition.length; i++) {
            cate_sql_string += " `categories`=" + cate_condition[i].categories_id + " OR"
        }
        cate_sql_string += " 0 )"
        // -------
        // 限制廠商
        let cp_sql_string = '('
        for (let i = 0; i < cpId.length; i++) {
            cp_sql_string += " `publishing`=" + cpId[i] + " OR"
        }
        cp_sql_string += " 0 )"
        // -------
        sql += cate_condition.length === 0 ? '' : 'AND ' + cate_sql_string
        sql += cpId.length.length === 0 ? '' : 'AND ' + cp_sql_string
        console.log(sql)
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
        if (info.group_type === 0 && info.cp_group === 0) {
            discount.books = []
        } else if (info.group_type === 0 && info.cp_group === 1) {
            let cpId = await AC.getDiscountCp(acId)
            discount.books = await AC.getDiscountBooksByCate(acId, cpId)
        } else if (info.group_type === 1) {
            let cpId = await AC.getDiscountCp(acId)
            discount.books = await AC.getDiscountBooksByCate(acId, cpId)
        } else {
            discount.books = await AC.getDiscountBooksById(acId)
        }
        // 取得折價金額
        discount.amount = await AC.getDiscountAmount(acId)
        console.log(123, acId, discount.amount)
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

    // 線下活動報名
    static async signUpActivity(req) {
        let inputData = req.body
        let sql = ''
        let result = {
            type: 1,
            description: '報名成功'
        }
        inputData.memberId = (await AC.memberSidMapArray())[inputData.memberNum] || req.sessionID

        // 檢查是否已報名
        if (inputData.memberNum !== 'not login' && inputData.memberId) {
            let sql = 'SELECT COUNT(1) FROM `ac_sign` WHERE `acId`=' + inputData.acId + ' AND `memberId`="' + inputData.memberId + '"'
            let isSign = (await sqlQuery(sql))[0]['COUNT(1)']
            if (isSign) {
                result.type = 0
                result.description = '已經報名過了'
                return result
            }
        }

        // 檢查名額
        sql = 'SELECT `quota`, `registered` FROM `ac_pbook2` WHERE `sid`=' + inputData.acId
        let { quota, registered } = (await sqlQuery(sql))[0]
        if ((quota - registered) <= 0) {
            result.type = 0
            result.description = '名額已滿'
            return result
        }

        // 寫入報名資料
        let currentTime = (new Date()).toLocaleString()
        sql = 'INSERT INTO `ac_sign`(`acId`, `memberId`, `name`, `phone`, `email`, `sign_up_time`)'
        sql += `VALUES (${inputData.acId},"${inputData.memberId}","${inputData.name}","${inputData.phone}","${inputData.email}","`
        sql += currentTime.substr(0, currentTime.length - 3) + '")'
        await sqlQuery(sql)

        // 名額減一
        sql = 'UPDATE `ac_pbook2` SET `registered`=' + (registered + 1) + ' WHERE `sid`=' + inputData.acId
        await sqlQuery(sql)

        return result
    }

    // 獲得線下活動報名資料
    static async getSignedActivities(req) {
        let memberNum = req.params.memberNum
        let memberId = (await AC.memberSidMapArray())[memberNum]
        if (!memberId) memberId = req.sessionID
        let sql = 'SELECT * FROM `ac_sign` WHERE `memberId`="' + memberId + '"'
        let signedAc = await sqlQuery(sql)

        sql = 'SELECT `sid`,`title`, `date`, `location`, `brief_intro` FROM `ac_pbook2` WHERE 0'
        for (let i = 0; i < signedAc.length; i++) {
            sql += ' OR `sid`=' + signedAc[i].acId
        }
        let acTitleArray = await sqlQuery(sql)
        signedAc.forEach(v => {
            let ac = acTitleArray.find(v2 => +v2.sid === +v.acId)
            v.title = ac.title
            v.date = ac.date
            v.location = ac.location
            v.brief_intro = ac.brief_intro
        })

        return signedAc
    }
    // 更改線下活動聯絡資料
    static async updateSignedActivities(inputData) {
        let result = {
            type: 1,
            description: '更改成功'
        }
        // 檢查是否曾經報名
        let sql = 'SELECT COUNT(1) FROM `ac_sign` WHERE '
        sql += '`sid`=' + inputData.sid + ' AND '
        sql += '`acId`="' + inputData.acId + '" AND '
        sql += '`memberId`="' + inputData.memberId + '"'
        let isSign = await sqlQuery(sql)
        if (!isSign[0]['COUNT(1)']) {
            result = {
                type: 0,
                description: '找不到活動'
            }
            return result
        }
        sql = 'UPDATE `ac_sign` SET '
        sql += '`name`="' + inputData.name + '", '
        sql += '`phone`="' + inputData.phone + '", '
        sql += '`email`="' + inputData.email + '"'
        sql += 'WHERE '
        sql += '`sid`=' + inputData.sid + ' AND '
        sql += '`acId`="' + inputData.acId + '" AND '
        sql += '`memberId`="' + inputData.memberId + '"'
        await sqlQuery(sql)
        return result
    }
    // 取消線下活動報名
    static async deleteSignedActivities(inputData) {
        let result = {
            type: 0,
            description: '找不到活動'
        }
        let sql = 'DELETE FROM `ac_sign` WHERE 1 AND'
        sql += '`sid`=' + inputData.sid + ' AND '
        sql += '`acId`="' + inputData.acId + '" AND '
        sql += '`memberId`="' + inputData.memberId + '"'
        let isDelete = await sqlQuery(sql)
        if (isDelete.affectedRows) {
            result = {
                type: 1,
                description: '成功取消',
            }
        }
        return result
    }

}
module.exports = AC
