const Joi = require('joi');

const addProduct = (data) => {
    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        worth: Joi.number().integer().required(),
    });
    return schema.validate(data);
};

module.exports = { addProduct }