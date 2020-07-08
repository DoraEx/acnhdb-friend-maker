const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

const url = "mongodb://localhost:27017";
var _db;
class MongoConnection {

}
function connectToServer( callback ) {
    MongoClient.connect(url, function(err, client) {
        _db = client.db('acnhdb')
        console.log('created database connection')
        return callback(err);
    })
}

function getDb () {
    return _db;
}
module.exports = {
    connectToServer,
    getDb
}