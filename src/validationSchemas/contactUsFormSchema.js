import Joi from 'joi';

export const contactUsFormSchema = Joi.object({
  first_name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Required field',
    'string.min': 'Min 2 characters',
    'string.max': 'Max 50 characters',
    'any.required': 'Required field',
  }),

  last_name: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Required field',
    'string.min': 'Min 2 characters',
    'string.max': 'Max 50 characters',
    'any.required': 'Required field',
  }),

  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Required field',
      'string.email': 'Invalid format',
      'any.required': 'Required field',
    }),

  phone_number: Joi.string()
    .trim()
    .pattern(/^\+?[0-9\s\-()]{7,20}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Invalid format',
    }),

  position: Joi.string().trim().max(100).optional().allow('').messages({
    'string.max': 'Max 100 characters',
  }),

  inquiry: Joi.string().trim().optional().allow(''),
  message: Joi.string().trim().max(300).optional().allow('').messages({
    'string.max': 'Max 300 characters',
  }),
});
