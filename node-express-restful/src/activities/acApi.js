import express from 'express'
import AC from './acModel'
import flatCache from 'flat-cache';
// import getRecommenderBooks from './recommandBook'
const router = express.Router()
const cache = flatCache.load('cacheId');




// 更新資料表亂數
// UPDATE `pm_general_discounts` SET `discounts`=ROUND(RAND()*30,0) WHERE `type`=6
// UPDATE `pm_general_discounts` d JOIN `pm_event2` e ON d.`event_id` = e.`sid` SET d.`discounts`=ROUND(RAND()*30,0) WHERE d.`type`=6 AND `group_type`

const flatCacheMiddleware = (req, res, next) => {
    let key = '__express__' + (req.originalUrl || req.url)
    let cacheContent = cache.getKey(key)
    // 如果換日就清光cache
    if (cacheContent) {
        let currentTime = new Date()
        let currentDate = currentTime.toISOString().substr(0, 10)
        let saveDate = cacheContent.saveTime.substr(0, 10)
        if (currentDate !== saveDate) {
            cache.removeKey(key)
            cacheContent = null
        }
    }
    // ------------------
    if (cacheContent) {
        res.send(cacheContent.body)
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            let saveTime = new Date()
            cache.setKey(key, { body, saveTime: saveTime.toISOString() })
            cache.save(true /* noPrune */)
            res.sendResponse(body)
        }
        next()
    }
}

var cache2 = flatCache.load('recommendBook', './src/activities/acCache')
let flatCacheMiddleware2 = (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cacheContent = cache2.getKey(key);
    if (cacheContent) {
        res.send(cacheContent);
    } else {
        res.sendResponse = res.send
        res.send = (body) => {
            cache2.setKey(key, body);
            cache2.save(true /* noPrune */);
            res.sendResponse(body)
        }
        next()
    }
};


router.get('/offline', async (req, res, next) => {
    res.json(await AC.getOfflineList())
})

router.get('/discount', async (req, res, next) => {
    res.json(await AC.getDiscountList())
})

router.get('/discount/:acId', async (req, res, next) => {
    let discount = await AC.getDiscountAllBooks(req.params.acId)
    res.json(discount)
})

// 取得特定書籍折價
router.get('/book-discount/:bookId/:memberLevel?', async (req, res, next) => {
    let memberLevel = req.params.memberLevel || 1
    res.json(await AC.getBookDiscount(req.params.bookId, memberLevel))
})
// 對某階級的會員，取得所有書籍折價資訊
router.get('/book-discount-for-member-level/:memberLevel', flatCacheMiddleware, async (req, res, next) => {
    res.json(await AC.getBooksDiscountForMemberLevel(req.params.memberLevel))
})

router.get('/recommend-books/:memberNum/:limit?', flatCacheMiddleware2, async (req, res, next) => {
    // if (req.params.limit) {
    //     res.json(await getRecommenderBooks(req.params.memberNum, req.params.limit))
    // } else {
    //     res.json(await getRecommenderBooks(req.params.memberNum))
    // }
})

// router.post('/add', (req, res, next) => {
//   //read product information from request
//   let product = new Product(req.body.prd_name, req.body.prd_price)

//   db.query(product.getAddProductSQL(), (err, data) => {
//     res.status(200).json({
//       message: 'Product added.',
//       productId: data.insertId,
//     })
//   })
// })

// router.get('/:productId', (req, res, next) => {
//   let pid = req.params.productId

//   db.query(Product.getProductByIdSQL(pid), (err, data) => {
//     if (!err) {
//       if (data && data.length > 0) {
//         res.status(200).json({
//           message: 'Product found.',
//           product: data,
//         })
//       } else {
//         res.status(200).json({
//           message: 'Product Not found.',
//         })
//       }
//     }
//   })
// })

// router.post('/delete', (req, res, next) => {
//   var pid = req.body.productId

//   db.query(Product.deleteProductByIdSQL(pid), (err, data) => {
//     if (!err) {
//       if (data && data.affectedRows > 0) {
//         res.status(200).json({
//           message: `Product deleted with id = ${pid}.`,
//           affectedRows: data.affectedRows,
//         })
//       } else {
//         res.status(200).json({
//           message: 'Product Not found.',
//         })
//       }
//     }
//   })
// })

module.exports = router
