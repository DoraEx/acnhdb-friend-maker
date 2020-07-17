const { Connection }= require('../utils/db');

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
        .filter(key => {
            if(key == 'color') {
                let condition = create_color_condition(params[key])
                conditions.push(condition)
            }
            else if (key == 'name') {
                let c = {};
                let regex = { $regex : new RegExp(`${params[key]}`, 'i')};
                c[key] = regex;
                conditions.push(c);
            }
            else if (typeof params[key] == 'object') {
                let c = {};
                let in_condition = {$in: params[key]};
                c[key] = in_condition;
                conditions.push(c)
            } 
            else {
                let c = {};
                c[key] = params[key];
                conditions.push(c);
            }
        })
    return conditions
};

// TODO make more concise
const create_color_condition = (colors) => {
    if(typeof colors == 'object') {
        const in_condition = {$in: colors};
        const or_conditions = [
            {color_1: in_condition},
            {color_2: in_condition}
        ];
        return {$or: or_conditions}
    } 
    const or_conditions = [
        {color_1: {$regex : new RegExp(colors, 'i')}},
        {color_2: {$regex : new RegExp(colors, 'i')}}
    ]
    return {$or: or_conditions}
}

module.exports = {
    getAll,
    getById,
    searchByParameters,
    getSearchParameters
}