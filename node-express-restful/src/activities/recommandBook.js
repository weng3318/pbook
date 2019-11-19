const recommender = require('recommender');
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
    let data = []
    try {
        data = await db.queryAsync(sql)
    } catch (err) {
        console.log(err);
    }
    return data
}

async function getUsersRateData() {
    let sql = 'SELECT * FROM `vb_ratings`'
    let usersRateData = await sqlQuery(sql)
    sql = 'SELECT COUNT(1) FROM `vb_books`'
    let booksNum = (await sqlQuery(sql))[0]['COUNT(1)']
    sql = 'SELECT COUNT(1) FROM `mr_information`'
    let usersNum = (await sqlQuery(sql))[0]['COUNT(1)']

    let usersRateMatrix = []
    usersRateMatrix[0] = (new Array(booksNum)).fill(3)
    for (let i = 1; i < usersNum; i++) {
        usersRateMatrix[i] = (new Array(booksNum)).fill(0)
    }
    for (let i = 0; i < usersRateData.length; i++) {
        let v = usersRateData[i]
        usersRateMatrix[+v.member.substr(2, 5)][+v.book] = +v.star
    }
    return usersRateMatrix

}


function recommendationsPromise(usersRateMatrix, memberId, limit) {
    return new Promise((resolve, rejects) => {
        try {
            recommender.getTopCFRecommendations(usersRateMatrix, memberId, { limit: limit }, (recommendations) => {
                resolve(recommendations)
            })
        } catch (err) {
            rejects(err)
        }
    })
}

async function getRecommenderBooks(memberId, limit = 8) {
    let sql = 'SELECT `MR_number` FROM `mr_information` WHERE `sid`=' + memberId
    let memberNum = +(await sqlQuery(sql))[0].MR_number.substr(2, 5)
    if (isNaN(memberNum)) memberNum = +memberId
    let usersRateMatrix = await getUsersRateData()
    let recommendBooksId = await recommendationsPromise(usersRateMatrix, memberNum, limit)

    sql = "SELECT * FROM `vb_books` WHERE ( "
    for (let i = 0; i < recommendBooksId.length; i++) {
        sql += " `sid`=" + recommendBooksId[i].itemId + " OR"
    }
    sql += " 0 )"
    let recommendBooks = await sqlQuery(sql)

    for (let i = 0; i < recommendBooks.length; i++) {
        for (let j = 0; j < recommendBooksId.length; j++) {
            if (+recommendBooks[i].sid === +recommendBooksId[j].itemId)
                recommendBooks[i].rating = recommendBooksId[j].rating
        }
    }


    return recommendBooks
}

export default getRecommenderBooks