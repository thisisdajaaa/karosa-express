import Joi from "joi";

const paramsValidation = {
  createShop: {
    body: Joi.object({
      name: Joi.string().required(),
    }).options({ abortEarly: false }),
  },

  updateShop: {
    body: Joi.object({
      name: Joi.string().required(),
    }).options({ abortEarly: false }),
  },

  addAddress: {
    body: Joi.object({
      name: Joi.string().required(),
      phoneNo: Joi.string().required(),
      detailed_address: Joi.string().required(),
      isDefaultAddress: Joi.boolean(),
      barangayId: Joi.number().required(),
    }).options({ abortEarly: false }),
  },

  updateAddress: {
    body: Joi.object({
      name: Joi.string().required(),
      phoneNo: Joi.string().required(),
      detailed_address: Joi.string().required(),
      isDefaultAddress: Joi.boolean(),
      barangayId: Joi.number().required(),
    }).options({ abortEarly: false }),
  },
};

export default paramsValidation;
