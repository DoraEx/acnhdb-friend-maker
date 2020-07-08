const express = require('express');
const mongoUtil = require('./utils/db');

const app = express();


// start connection
mongoUtil.connectToServer(function(err, client){
    if(err) {console.log(err)}
})

// add routes
app.use(require('./routes'));

// start server
app.listen(3030, () => { console.log('app started on port 3030')});