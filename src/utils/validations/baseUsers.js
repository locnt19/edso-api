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
        .forbidden(),
    fullName: Joi.string().min(5).max(90),
    birthDate: Joi.date(),
    gender: Joi.valid('M', 'F'),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .trim()
        .lowercase(),
    phone: Joi.string(),
    address: Joi.string(),
    schoolID: Joi.string().forbidden(),
    avatar: Joi.string(),
    isActive: Joi.any().forbidden()
})
