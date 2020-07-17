const furnitureData = require('../data_access/furniture');

const getAll = async() => {
    return await furnitureData.getAll();
}
const getByCategory = async(category) => {
    return await furnitureData.getAllByCategory(category);
}

module.exports = {
    getAll,
    getByCategory
}