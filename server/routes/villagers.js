const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(['the list of all villagers']);
});

router.get('/search', (req, res) => {
    res.json(['you searched for ' + req.query.name]);
});

router.get('/:id', (req, res) => {
    res.json(['you sent the id ' + req.params.id]);
});

module.exports = router;