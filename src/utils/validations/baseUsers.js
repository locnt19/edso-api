import Joi from 'joi';

export const baseUserRegisterInputSchema = Joi.object().keys({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    fullName: Joi.string().min(5).max(90).required(),
    birthDate: Joi.date().required(),
    gender: Joi.valid('M', 'F').required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .lowercase(),
    phone: Joi.string().required(),
    address: Joi.string(),
    // schoolID: Joi.string().when('role', { is: Joi.valid('Manager', 'Teacher', 'Support', 'Student'), then: Joi.required()}),
    avatar: Joi.string(),
    isActive: Joi.any().forbidden()
})

export const baseUserUpdateInputSchema = Joi.object().keys({
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .optional(),
    fullName: Joi.string().min(5).max(90).optional(),
    birthDate: Joi.date().optional(),
    gender: Joi.valid('M', 'F').optional(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .lowercase()
        .optional(),
    phone: Joi.string().optional(),
    address: Joi.string().optional(),
    schoolID: Joi.string().forbidden(),
    avatar: Joi.string().optional(),
    isActive: Joi.any().forbidden()
})
