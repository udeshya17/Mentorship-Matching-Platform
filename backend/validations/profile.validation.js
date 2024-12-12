const Joi = require('joi');

const profileSchema = Joi.object({
  userId: Joi.string().required(),
  role: Joi.string().valid('mentor', 'mentee').required(),
  skills: Joi.array().items(Joi.string()).min(1).required(),
  interests: Joi.array().items(Joi.string()).min(1).required(),
  bio: Joi.string().max(500).required(),
});

module.exports = {
  profileSchema,
};
