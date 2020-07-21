const furnitureData = require('../data_access/furniture');

const getAll = async() => {
    return await furnitureData.getAll();
}
const getByCategory = async(category) => {
    return await furnitureData.getAllByCategory(category);
}

const getById = async(id) => {
    return await furnitureData.getById(id);
}

const searchByParameters = async (category, params) => {
    return await furnitureData.searchByParameters(category, params);
}

module.exports = {
    getAll,
    getByCategory,
    getById,
    searchByParameters
}