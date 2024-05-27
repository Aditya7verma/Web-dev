const Joi = require("joi");

// Created Schema of Joi and at the same time exporte too.
// We can write this whole thing in "router.post('/products', async (req,res) =>{})"

module.exports.productSchema = Joi.object({
  name: Joi.string().required(),
  img: Joi.string().required(),
  price: Joi.number().min(0).required(),
  desc: Joi.string().required(),
});

// Creating for Review

module.exports.reviewSchema = Joi.object({
  rating: Joi.number().min(0).max(5),
  comment: Joi.string().required(),
});
