// Common methods used by the services
const getConditions = (params) => {
    let conditions = []
    Object.keys(params)
        .filter(key => {
            if(key == 'color') {
                let condition = createColorCondition(params[key])
                conditions.push(condition)
            }
            else if (key == 'name') {
                let c = {};
                let regex = { $regex : new RegExp(`${params[key]}`, 'i')};
                c[key] = regex;
                conditions.push(c);
            }
            else if (typeof params[key] == 'object') {
                let c = {};
                let in_condition = {$in: params[key]};
                c[key] = in_condition;
                conditions.push(c)
            } 
            else {
                let c = {};
                c[key] = params[key];
                conditions.push(c);
            }
        })
    return conditions
};

// TODO make more concise
const createColorCondition = (colors) => {
    if(typeof colors == 'object') {
        const in_condition = {$in: colors};
        const or_conditions = [
            {color_1: in_condition},
            {color_2: in_condition}
        ];
        return {$or: or_conditions}
    } 
    const or_conditions = [
        {color_1: {$regex : new RegExp(colors, 'i')}},
        {color_2: {$regex : new RegExp(colors, 'i')}}
    ]
    return {$or: or_conditions}
}

module.exports = {
    getConditions
}
