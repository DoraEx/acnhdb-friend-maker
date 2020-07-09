// function to handle request and response validation and extraction
const villagerService = require('../services/villagers')

const get = async (req, res) => {

    if(hasParams(req.query)) {
        const params = extractValidParams(req.query)
        const villagers = await villagerService.searchByParameters(params)
        res.json(villagers)
    } else {
        const villagers = await villagerService.getAll()
        res.json(villagers)
    }
};
const getById = async (req, res) => {
    const id = req.params.id;
    //TODO validation
    const villager = await villagerService.getById(id);
    res.json(villager)
};

const hasParams = (obj) => {
    return Object.keys(obj).length !== 0
}

const extractValidParams = (params) => {
    // TODO actual validation
    const name = params.name;
    const species = params.species;
    const gender = params.gender;
    const personality = params.personality;

    return { name, species, gender, personality };
}

module.exports = {
    get, 
    getById
}