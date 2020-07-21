// function to handle request and response validation and extraction
const villagerService = require('../services/villagers');
const ControllerUtils = require('./utils');

const get = async (req, res) => {
    if(ControllerUtils.hasParams(req.query)) {
        try {
            const params = ControllerUtils.extractValidVillagersParams(req.query)
            const villagers = await villagerService.searchByParameters(params)
            res.json(villagers)
        } catch (error) {
            
             error ? res.status(400).send(error) : res.status(400).send('There was an unknown error');
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


module.exports = {
    get, 
    getById,
    getParams
}