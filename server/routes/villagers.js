const express = require('express')
const router = express.Router()
const { Connection }= require('../utils/db');

//TODO move to models
router.get('/', async (req, res) => {
    let db = await Connection.getDb()
    let results = db.collection('villagers').find({}) 
    let villagers = await results.toArray()
    res.json(villagers)
})

router.get('/search', (req, res) => {
    res.json(['you searched for ' + req.query.search])
})

router.get('/:id', (req, res) => {
    res.json(['you sent the id ' + req.params.id]);
})


module.exports = router;