const furnitureService = require('../services/furniture');
const get = async (req, res) => {
    // if(hasParams(req.query)) {
    //     try {
    //         const params = extractValidParams(req.query)
    //         const villagers = await villagerService.searchByParameters(params)
    //         res.json(villagers)
    //     } catch (error) {
            
    //          error ? res.status(400).send(error) : res.status(400).send('There was an unknown error');
    //     }
    // } else {
        const furniture = await furnitureService.getAll()
        res.json(furniture)
    // }
};
const getByCategory = async(req, res) => {

    const furniture = await furnitureService.getByCategory(req.params.category); 
    res.json(furniture);
}

module.exports = {
    get,
    getByCategory
}