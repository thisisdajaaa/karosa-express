import Joi from "joi";

export const paramsValidation = {
  // POST /api/users
  createUser: {
    body: Joi.object({
      fullName: Joi.string(),
    }).options({ abortEarly: false }),
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: Joi.object({
      fullName: Joi.string(),
      gender: Joi.string(),
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
