const { Connection }= require('../utils/db');
const ServiceUtils  = require('./utils');
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
    const conditions = ServiceUtils.getConditions(params);
    const results = db.collection('villagers').find({$and : conditions}) ;
    const villagers = await results.toArray();
    return villagers;
};
const getSearchParameters = async () => {
    const db = await Connection.getDb()
    const results = db.collection('villagers').aggregate([{
        $group: {
            _id : null,
            personality: { $addToSet : '$personality' }, 
            gender: {$addToSet : '$gender'},
            species : {$addToSet : '$species'},
            color: {
                $addToSet: '$color_1',
                $addToSet: '$color_2'
            }
        }
    }])
    const parameters = await results.toArray()
    return parameters[0];
};

module.exports = {
    getAll,
    getById,
    searchByParameters,
    getSearchParameters
}