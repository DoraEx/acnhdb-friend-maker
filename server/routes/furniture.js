const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(['the list of all furniture']);
});

router.get('/search', (req, res) => {
    // search by name, category, color
    res.json(['you searched for ' + req.query.name]);
});

router.get('/:name', (req, res) => {
    res.json(['you sent the id ' + req.params.name]);
});
module.exports = router;