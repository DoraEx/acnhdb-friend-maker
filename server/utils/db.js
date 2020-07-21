const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectId = mongodb.ObjectID;


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
    
    static toObjectId(id) {
        return new ObjectId(id);
    }

    static isValidId(id) {
        return ObjectId.isValid(id)
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