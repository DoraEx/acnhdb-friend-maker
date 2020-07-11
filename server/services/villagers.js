const villagerData = require('../data_access/villagers');

const getAll = async () => {
    return await villagerData.getAll()
}

const getById = async (id) => {
    return await villagerData.getById(id)
}

const searchByParameters =  async (params) => {
    return await villagerData.searchByParameters(params)
}
const getSearchParameters = async () => {
    return await villagerData.getSearchParameters();
}

module.exports = {
    getAll,
    getById,
    searchByParameters,
    getSearchParameters
}