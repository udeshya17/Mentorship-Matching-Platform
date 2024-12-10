const Joi = require("joi");

const userValidationSchema = Joi.object().keys({
  username: Joi.string().required().max(25),  
  email: Joi.string().required().email(),    
  password: Joi.string().required().min(6),    
});

module.exports = { userValidationSchema };
