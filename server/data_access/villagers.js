const { Connection }= require('../utils/db');
const { param } = require('../routes');


const getAll = async () => {
    const db = await Connection.getDb()
    const results = db.collection('villagers').find({}) 
    const villagers = await results.toArray()
    return villagers
};

const getById = async (id) => {
    const db = await Connection.getDb()
    const villager = await db.collection('villagers').findOne({"_id" : id}) 
    return villager
};
const searchByParameters = async (params) => {
    const db = await Connection.getDb()
    const conditions = getConditions(params);
    const results = db.collection('villagers').find({$and : conditions}) ;
    const villagers = await results.toArray();
    return villagers;
};

const getConditions = (params) => {
    let conditions = []
    Object.keys(params)
        .filter(key => params[key])
        .forEach(key => {
            let c = {}
            let regex = { $regex : new RegExp(params[key], 'i')};
            c[key] = regex
            conditions.push(c)
        })
    return conditions
}

module.exports = {
    getAll,
    getById,
    searchByParameters
}