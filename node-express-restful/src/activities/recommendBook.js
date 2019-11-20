import { db, sqlQuery } from './connectDB'

let memberArray = []
let bookArray = []
async function getUsersRateData() {
    // 取得member sid對應排序陣列
    let sql = 'SELECT `MR_number` FROM `mr_information` WHERE 1'
    memberArray = (await sqlQuery(sql)).map(v => v.MR_number).sort()
    sql = 'SELECT `sid` FROM `vb_books` WHERE 1'
    bookArray = (await sqlQuery(sql)).map(v => +v.sid).sort(function (a, b) {
        return a - b
    })

    sql = 'SELECT * FROM `vb_ratings`'
    let usersRateData = await sqlQuery(sql)
    sql = 'SELECT COUNT(1) FROM `vb_books`'
    let booksNum = (await sqlQuery(sql))[0]['COUNT(1)']
    sql = 'SELECT COUNT(1) FROM `mr_information`'
    let usersNum = (await sqlQuery(sql))[0]['COUNT(1)']

    let usersRateMatrix = []
    for (let i = 0; i < usersNum; i++) {
        usersRateMatrix[i] = (new Array(booksNum)).fill(0)
    }
    for (let i = 0; i < usersRateData.length; i++) {
        let v = usersRateData[i]

        let book = bookArray.indexOf(v.book)
        let member = memberArray.indexOf(v.member)
        if (book === -1 || member === -1) continue

        usersRateMatrix[member][book] = +v.star
    }
    return usersRateMatrix
}


function recommendationsPromise(usersRateMatrix, member) {
    let x = usersRateMatrix[member]
    let similarityArray = []
    let cos = 0

    for (let i = 0; i < usersRateMatrix.length; i++) {
        if (i === member) continue
        cos = computeCosineSimilarity(x, usersRateMatrix[i])
        similarityArray.push({ member: i, cos: cos })
    }
    return similarityArray
}

function computeCosineSimilarity(x, y) {
    let vlength = x.length
    let x_norm = 0
    let y_norm = 0
    let cosxy = 0
    for (let i = 0; i < vlength; i++) {
        x_norm += x[i] * x[i]
        y_norm += y[i] * y[i]
        cosxy += x[i] * y[i]
    }
    x_norm = Math.sqrt(x_norm)
    y_norm = Math.sqrt(y_norm)
    if (x_norm === 0 || y_norm === 0) {
        cosxy = 0
    } else {
        cosxy = cosxy / (x_norm * y_norm)
    }
    return cosxy
}

async function getRecommenderBooks(memberNum, limit = 8) {

    let usersRateMatrix = await getUsersRateData()
    let member = memberArray.indexOf(memberNum)
    if (member === -1) member = 0
    let memberRating = usersRateMatrix[member]
    let similarityArray = recommendationsPromise(usersRateMatrix, member)
    let sortSimilarityArray = similarityArray.sort((a, b) => b.cos - a.cos)
    let predictArray = []
    // console.log(sortSimilarityArray)

    for (let i = 0; i < memberRating.length; i++) {
        memberRating[i] = 1.0 * memberRating[i]
        if (memberRating[i]) continue
        let weightSum = 0
        let count = 0
        for (let j = 0; j < usersRateMatrix.length - 1; j++) {
            let userJRating = 1.0 * usersRateMatrix[sortSimilarityArray[j].member][i]
            if (!userJRating) {
                continue
            }
            count++            
            if (count > 7) break
            let weight = 1.0 * sortSimilarityArray[j].cos
            memberRating[i] += weight * userJRating
            weightSum += weight
        }
        if (weightSum === 0) {
            memberRating[i] = 0
        } else {
            memberRating[i] = memberRating[i] / weightSum
        }
        predictArray.push({ bookId: bookArray[i], rating: memberRating[i] })
    }
    predictArray.sort((a, b) => b.rating - a.rating)
    let recommendBooksId = predictArray.slice(0, limit)
    // console.log(recommendBooksId)
    let sql = "SELECT * FROM `vb_books` WHERE ( "
    for (let i = 0; i < recommendBooksId.length; i++) {
        sql += " `sid`=" + recommendBooksId[i].bookId + " OR"
    }
    sql += " 0 )"
    let recommendBooks = await sqlQuery(sql)

    for (let i = 0; i < recommendBooks.length; i++) {
        for (let j = 0; j < recommendBooksId.length; j++) {
            if (+recommendBooks[i].sid === +recommendBooksId[j].bookId)
                recommendBooks[i].rating = recommendBooksId[j].rating
        }
    }

    return recommendBooks.sort((a, b) => b.rating - a.rating)
}

export default getRecommenderBooks