const express = require('express');
const app = express();

// add routes
app.use(require('./routes'));

// start server
app.listen(3030);