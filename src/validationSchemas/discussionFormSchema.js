import Joi from 'joi';

export const discussionFormSchema = Joi.object({
  name: Joi.string().trim().max(50).optional().allow('').messages({
    'string.max': 'Max 50 characters',
  }),

  response: Joi.string().trim().max(1000).required().messages({
    'string.empty': 'Required field',
    'string.max': 'Max 1000 characters',
    'any.required': 'Required field',
  }),
});
