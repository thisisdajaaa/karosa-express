import Joi from "joi";
const paramsValidation = {
  createProduct: {
    body: Joi.object({
      name: Joi.string().required(),
      categoryId: Joi.number().required(),
      description: Joi.string().allow(""),
    }).options({ abortEarly: false }),
  },

  updateProduct: {
    body: Joi.object({
      name: Joi.string().required(),
      categoryId: Joi.number().required(),
      description: Joi.string().allow(""),
    }).options({ abortEarly: false }),
  },

  addReview: {
    body: Joi.object({
      comment: Joi.string().required(),
      rating: Joi.number().required(),
    }).options({ abortEarly: false }),
  },

  updateReview: {
    body: Joi.object({
      comment: Joi.string().required(),
      rating: Joi.number().required(),
    }).options({ abortEarly: false }),
  },

  createVariation: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      photo: Joi.string(),
      weight: Joi.number(),
      shelf_life: Joi.number(),
    }).options({ abortEarly: false }),
  },
  updateVariation: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      stock: Joi.number().required(),
      photo: Joi.string(),
      weight: Joi.number(),
      shelf_life: Joi.number(),
    }).options({ abortEarly: false }),
  },
};

export default paramsValidation;
