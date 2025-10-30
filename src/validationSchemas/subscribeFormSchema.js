import Joi from 'joi';

export const subscribeFormSchema = Joi.object({
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required(),
});
