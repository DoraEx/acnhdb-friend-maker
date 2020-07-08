const express = require('express');
const { Connection } = require('./utils/db');

const app = express();


// start connection
Connection.connectToMongo()

// add routes
app.use(require('./routes'));

// start server
app.listen(3030, () => { console.log('app started on port 3030')});