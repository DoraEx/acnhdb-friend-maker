const { Connection } = require('../utils/db');
const ServiceUtils = require('./utils');

const getAll = async () => {
    const db = await Connection.getDb();
    const results = db.collection('furniture').find({}) ;
    const furniture = await results.toArray();
    return furniture;
};


const getAllByCategory = async (category) => {
    const db = await Connection.getDb();
    const results = db.collection('furniture').find({'category': category }); 
    const furniture = await results.toArray();
    return furniture;
}

const getById = async (id) => {
    const db = await Connection.getDb();
    const query = {
        '_id': Connection.toObjectId(id)
    }
    const furniture = await db.collection('furniture').findOne(query);
    return furniture;
}

const searchByParameters = async (category, params) => {
    const db = await Connection.getDb();
    const conditions = ServiceUtils.getConditions(params);
    category ? conditions.push({'category': category}) : false;
    const results = db.collection('furniture').find({$and : conditions});
    const furniture = await results.toArray();
    return furniture;
}

module.exports = {
    getAll, 
    getAllByCategory,
    getById,
    searchByParameters,
}