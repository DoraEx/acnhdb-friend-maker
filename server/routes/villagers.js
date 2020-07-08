const express = require('express')
const router = express.Router()
const dbUtil = require('../utils/db');
const db = dbUtil.getDb();
console.log('here')
router.get('/', (req, res) => {
    let villagers = db.collection.villagers.find({})
    console.log(villagers)
    res.json(['the list of all villagers'])
})

router.get('/search', (req, res) => {
    res.json(['you searched for ' + req.query.search])
})

router.get('/:id', (req, res) => {
    res.json(['you sent the id ' + req.params.id]);
})


module.exports = router;