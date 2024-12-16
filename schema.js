const Joi = require('joi');


module.exports.listingSchema = Joi.object({
    // listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    // imageURL: Joi.string().allow("", null),
    price: Joi.number().min(0),
    location: Joi.string(),
    country: Joi.string().required()
    // })
});


reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required(),
        comment: Joi.string().required()
    }).required()
});
