import Joi from "joi";

export const paramsValidation = {
  auth: {
    body: Joi.object({
      identifier: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ abortEarly: false }),
  },

  // POST /auth/changePassword
  changePassword: {
    body: Joi.object({
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
    }).options({ abortEarly: false }),
  },
};
