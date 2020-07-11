// function to handle request and response validation and extraction
const villagerService = require('../services/villagers');

const get = async (req, res) => {
    if(hasParams(req.query)) {
        try {
            const params = extractValidParams(req.query)
            const villagers = await villagerService.searchByParameters(params)
            res.json(villagers)
        } catch (error) {
            res.status(400).send(error)
        }
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

const getParams = async (req, res) => {
    const params = await villagerService.getSearchParameters();
    res.json(params);
}

const hasParams = (obj) => {
    return Object.keys(obj).length !== 0
}

const extractValidParams = (params) => {
    const name = validateString(params.name)
    const species = validateString(params.species);
    const gender = validateString(params.gender);
    const personality = validateString(params.personality);
    const color = validateString(params.color);
    const birth_month = validateNumber(params.birth_month);
    const birth_day = validateNumber(params.birth_day);
    
    let validParams = {name, species, gender, personality, color, birth_month, birth_day};
    for(let key in validParams) {
        if(!validParams[key])
            delete validParams[key];
    }
    if(Object.keys(validParams).length == 0) {
        throw 'There are no valid parameters'
    }
    return validParams
}

const validateString = (input) => {
    if(!input) return;
    if(typeof input !== 'string') throw `Invalid Value [${input}]: Value must be a string`;
    if(input.length > 30) throw `Invalid Value [${input}]: Value must not exceed 30 characters`;
    return input.trim();
}
const validateNumber = (input) => {
    if(!input) return;
    if(Number(input) === NaN) throw `Invalid Value [${input}]: Value must be a number`;   
    if(input > 31 || input < 1) throw `Invalid Value [${input}]: Value must be between 1 and 31`;
    return Number(input).valueOf();
}

module.exports = {
    get, 
    getById,
    getParams
}