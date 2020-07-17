const { Connection }= require('../utils/db');
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

module.exports = {
    getAll, 
    getAllByCategory
}