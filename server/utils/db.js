const mongodb = require('mongodb');
let MongoClient = mongodb.MongoClient;

class Connection {
    static async connectToMongo() {
        let client = await MongoClient.connect(this.url, this.options)
        this.db = client.db('acnhdb')
    }

    static async getDb() {
        if (!this.db) 
            await this.connectToMongo()
        return this.db
    }
}

Connection.db = null
Connection.url = 'mongodb://localhost:27017/acnhdb'
Connection.options = {
    bufferMaxEntries:   0,
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }