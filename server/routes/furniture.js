const express = require('express');
const furniture = require('../controllers/furniture');
const router = express.Router();

router.get('/', furniture.get);
// router.get('/parameters', (req, res) => res.json(['the list of search parameters and values']))
router.get('/:category', furniture.getByCategory);
router.get('/:category/:id', furniture.getById);

module.exports = router;