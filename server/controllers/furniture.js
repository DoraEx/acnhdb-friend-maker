const furnitureService = require('../services/furniture');
const ControllerUtils = require('./utils');
const { Connection } = require('../utils/db');
const get = async (req, res) => {
    if(ControllerUtils.hasParams(req.query)) {
        try {
            const params = ControllerUtils.extractValidFurnitureParams(req.query)
            const furniture = await furnitureService.searchByParameters(undefined, params)
            res.json(furniture)
        } catch (error) {    
             error ? res.status(400).send(error) : res.status(400).send('There was an unknown error');
        }
    } else {
        const furniture = await furnitureService.getAll()
        res.json(furniture)
    }
};
const getByCategory = async(req, res) => {
    // TODO check if valid category
    if(ControllerUtils.hasParams(req.query)) {
        try {
            const params = ControllerUtils.extractValidFurnitureParams(req.query)
            const furniture = await furnitureService.searchByParameters(req.params.category, params)
            res.json(furniture)
        } catch (error) {    
             error ? res.status(400).send(error) : res.status(400).send('There was an unknown error');
        }
    } else {
        const furniture = await furnitureService.getByCategory(req.params.category); 
        res.json(furniture);
    }
}

const getById = async (req, res) => {
    const id = req.params.id;
    const valid = Connection.isValidId(id);
    if(!valid) throw `The id ${id} is invalid.`;
    const furniture = await furnitureService.getById(id);
    res.json(furniture);
} 

module.exports = {
    get,
    getByCategory,
    getById
}