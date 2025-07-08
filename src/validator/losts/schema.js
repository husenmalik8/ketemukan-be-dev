const Joi = require('joi');

const LostPayloadSchema = Joi.object({
  title: Joi.string().required(),
  short_desc: Joi.string().required(),
  description: Joi.string().required(),
  lost_date: Joi.string().required(),
});

module.exports = { LostPayloadSchema };
