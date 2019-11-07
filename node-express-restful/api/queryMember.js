import express from 'express'
import db from '../db/database'
import member from '../domain/member'
const router = express.Router()

router.get('/', (req, res, next)=>{
    let Member = new member()
    db.query(Member.getAllMemberSql(), (err, rows)=>{
        // console.log(rows.length);
        res.send(rows)
    })
})


module.exports = router;