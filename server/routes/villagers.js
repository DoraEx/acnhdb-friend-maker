const express = require('express')
const router = express.Router()
const villagers = require('../controllers/villagers');

// endpoints and callback functions
router.get('/', villagers.get)
router.get('/:id', villagers.getById)

module.exports = router;