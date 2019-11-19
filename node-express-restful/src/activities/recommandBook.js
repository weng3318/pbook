// const recommender = require('recommender');
// import {db, sqlQuery} from './connectDB'

// let memberArray=[]
// async function getUsersRateData() {
//     // 取得member sid對應排序陣列
//     let sql = 'SELECT `MR_number` FROM `mr_information` WHERE 1'
//     memberArray = (await sqlQuery(sql)).map(v => v.MR_number).sort()
//     sql = 'SELECT `sid` FROM `vb_books` WHERE 1'
//     let bookArray = (await sqlQuery(sql)).map(v => +v.sid).sort(function (a, b) {
//         return a - b
//     })

//     sql = 'SELECT * FROM `vb_ratings`'
//     let usersRateData = await sqlQuery(sql)
//     sql = 'SELECT COUNT(1) FROM `vb_books`'
//     let booksNum = (await sqlQuery(sql))[0]['COUNT(1)']
//     sql = 'SELECT COUNT(1) FROM `mr_information`'
//     let usersNum = (await sqlQuery(sql))[0]['COUNT(1)']

//     let usersRateMatrix = []
//     for (let i = 0; i < usersNum; i++) {
//         usersRateMatrix[i] = (new Array(booksNum)).fill(0)
//     }
//     for (let i = 0; i < usersRateData.length; i++) {
//         let v = usersRateData[i]

//         let book = bookArray.indexOf(v.book)
//         let member = memberArray.indexOf(v.member)
//         if (book === -1 || member === -1) continue

//         usersRateMatrix[member][book] = +v.star
//     }
//     return usersRateMatrix
// }


// function recommendationsPromise(usersRateMatrix, memberId, limit) {
//     return new Promise((resolve, rejects) => {
//         try {
//             recommender.getTopCFRecommendations(usersRateMatrix, memberId, { limit: limit }, (recommendations) => {
//                 resolve(recommendations)
//             })
//         } catch (err) {
//             rejects(err)
//         }
//     })
// }

// async function getRecommenderBooks(memberNum, limit = 8) {

//     let usersRateMatrix = await getUsersRateData()
//     let member = memberArray.indexOf(memberNum)
//     let recommendBooksId = await recommendationsPromise(usersRateMatrix, member, limit)

//     let sql = "SELECT * FROM `vb_books` WHERE ( "
//     for (let i = 0; i < recommendBooksId.length; i++) {
//         sql += " `sid`=" + recommendBooksId[i].itemId + " OR"
//     }
//     sql += " 0 )"
//     let recommendBooks = await sqlQuery(sql)

//     for (let i = 0; i < recommendBooks.length; i++) {
//         for (let j = 0; j < recommendBooksId.length; j++) {
//             if (+recommendBooks[i].sid === +recommendBooksId[j].itemId)
//                 recommendBooks[i].rating = recommendBooksId[j].rating
//         }
//     }

//     return recommendBooks
// }

// export default getRecommenderBooks