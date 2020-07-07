const express = require('express');
const router = express.Router();

router.use('/villagers', require('./villagers'));
router.use('/furniture', require('./furniture'));
router.use('/clothing', require('./clothing'));
module.exports =  router;