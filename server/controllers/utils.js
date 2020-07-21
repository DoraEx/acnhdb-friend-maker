// Common methods for all controllers


const hasParams = (obj) => {
    return Object.keys(obj).length !== 0
}

const extractValidVillagerParams = (params) => {
    const name = validateStringParam(params.name);
    const species = validateStringParam(params.species);
    const gender = validateStringParam(params.gender);
    const personality = validateStringParam(params.personality);
    const color = validateStringParam(params.color);
    const birth_month = validateNumber(params.birth_month);
    const birth_day = validateNumber(params.birth_day);
    
    let validParams = {name, species, gender, personality, color, birth_month, birth_day};  
    removeEmptyParams(validParams);
    return validParams;
}

const extractValidFurnitureParams = (params) => {
    const name = validateStringParam(params.name);

    let validParams = {name};
    removeEmptyParams;
    return validParams;

}

const removeEmptyParams = (validParams) => {
    for(let key in validParams) {
        if(!validParams[key])
            delete validParams[key];
    }
    if(Object.keys(validParams).length == 0) {
        throw 'There are no valid parameters';
    }
    
}

// Validate the string or array of strings
const validateStringParam = (input) => {
    if(!input) return;
    if (typeof input == 'object') {
        if(input.length == 0 ) throw `Invalid Value ${object}: Params not provided`
        input = input.map(i =>  validateStringValue(i));
        return input;
    } else {
        return validateStringValue(input);
    }
}
// Validate a single string
const validateStringValue = (input) => {
    if(typeof input !== 'string') throw `Invalid Value [${input}]: Value must be a string`;
    if(input.length > 30) throw `Invalid Value [${input}]: Value must not exceed 30 characters`;
    return input.trim().toLowerCase();
}
// Validate the string or array of strings
const validateNumber = (input) => {
    if(!input) return;
    if (typeof input == 'object') {
        if(input.length == 0 ) throw `Invalid Value ${object}: Params not provided`
        input.forEach( i => i = validateNumberValue(i));
        return input;
    } else {
        return validateNumberValue(input);
    }
    
}
// Validate a single number
const validateNumberValue = (input) => {
    if(Number(input) === NaN) throw `Invalid Value [${input}]: Value must be a number`;   
    if(input > 31 || input < 1) throw `Invalid Value [${input}]: Value must be between 1 and 31`;
    return Number(input).valueOf();
}

module.exports = {
    hasParams,
    extractValidVillagerParams,
    extractValidFurnitureParams
}