import Joi from "joi";

export const paramsValidation = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      price: Joi.string().required(),
      stock: Joi.string().required(),
      photo: Joi.string(),
      weight: Joi.string().required(),
      shelf_life: Joi.string().required(),
    }).options({ abortEarly: false }),
  },
  update: {
    body: Joi.object({
      name: Joi.string(),
      price: Joi.string(),
      stock: Joi.string(),
      photo: Joi.string(),
      weight: Joi.string(),
      shelf_life: Joi.string(),
    }).options({ abortEarly: false }),
  },
};
