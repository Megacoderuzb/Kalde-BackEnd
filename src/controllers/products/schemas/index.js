const Joi = require("joi");

exports.postProductsSchema = Joi.object({
  uz_product_name: Joi.string().min(2),
  ru_product_name: Joi.string().min(2),
  en_product_name: Joi.string().min(2),

  uz_desc: Joi.string(),
  ru_desc: Joi.string(),
  en_desc: Joi.string(),

  price: Joi.string(),
  ichki_diametr: Joi.string(),
  ichki_uzunlik: Joi.string(),
  tashqi_uzunlik: Joi.string(),
  razmer: Joi.string(),
  soni: Joi.string(),
  barcode: Joi.string(),
  diametr: Joi.string(),

  category_id: Joi.number().integer(),
  image: Joi.any().optional(),
});

exports.patchProductsSchema = Joi.object({
  uz_product_name: Joi.string(),
  ru_product_name: Joi.string(),
  en_product_name: Joi.string(),

  uz_desc: Joi.string(),
  ru_desc: Joi.string(),
  en_desc: Joi.string(),

  price: Joi.string(),
  ichki_diametr: Joi.string(),
  ichki_uzunlik: Joi.string(),
  tashqi_uzunlik: Joi.string(),
  razmer: Joi.string(),
  soni: Joi.string(),
  barcode: Joi.string(),
  diametr: Joi.string(),

  category_id: Joi.number().integer(),
  image: Joi.any().optional(),
});
