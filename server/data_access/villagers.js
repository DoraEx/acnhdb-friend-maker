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
const getConditions = (params) => {
    let conditions = []
    Object.keys(params)
        .filter(key => params[key])
        .forEach(key => {
            if(key == 'color') {
                const or_conditions = [
                    {color_1: {$regex : new RegExp(params[key], 'i')}},
                    {color_2: {$regex : new RegExp(params[key], 'i')}}
                ]
                conditions.push({$or: or_conditions});
                
            } else {
                let c = {}
                let regex = { $regex : new RegExp(params[key], 'i')};
                c[key] = regex
                conditions.push(c)
            }
        })
    return conditions
};

module.exports = {
    getAll,
    getById,
    searchByParameters,
    getSearchParameters
}