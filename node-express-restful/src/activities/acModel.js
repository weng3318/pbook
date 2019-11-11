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
        let sql = "SELECT * FROM `pm_event`"
        try {
            var data = await db.queryAsync(sql)
        } catch (err) {
            console.log(err);
        }
        return data
    }
    
    static getProductByIdSQL(acType, id) {
        let sql = `SELECT * FROM PRODUCTS WHERE PRD_ID = ${prd_id}`
        return sql
    }

    static deleteProductByIdSQL(acType, id) {
        let sql = `DELETE FROM PRODUCTS WHERE PRD_ID = ${prd_id}`
        return sql
    }

    static getAllProductSQL() {
        let sql = `SELECT * FROM PRODUCTS`
        return sql
    }

}
module.exports = AC
