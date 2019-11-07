import express from 'express'
import db from '../db/database'
const router = express.Router()

//清除session
router.get('/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router;