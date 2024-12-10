const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  username: Joi.string().required().max(25),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string().required(),
});

module.exports = { userValidationSchema };
