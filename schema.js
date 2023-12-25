const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object().required({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        Image: joi.string().allow("",null)
    })
});

module.exports.reviewSchema = joi.object({
    reviw: joi.object({
        rating: joi.number().required(),
        Comment: joi.string().required(),
    }).required(),
});

