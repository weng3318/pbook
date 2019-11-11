import express from 'express'
import AC from './acModel'

const router = express.Router()

router.get('/offline', async (req, res, next) => {    
    res.json( await AC.getOfflineList())
})

router.get('/discount', async (req, res, next) => {    
    res.json( await AC.getDiscountList())
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
