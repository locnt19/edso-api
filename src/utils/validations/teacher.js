import Joi from 'joi';
import { baseUserRegisterInputSchema, baseUserUpdateInputSchema } from '.';

export const teacherRegisterInputSchema = baseUserRegisterInputSchema.keys({
    centerId: Joi.string().required(),
    level: Joi.valid('Bachelor', 'Master', 'PhD').required(),
    classIds: Joi.array().items(Joi.string()),
    subjects: Joi.array().items(Joi.string().required()),
    workPlace: Joi.string().required()
})

export const teacherUpdateInputSchema = baseUserUpdateInputSchema.keys({
    level: Joi.valid('Bachelor', 'Master', 'PhD').optional(),
    subjects: Joi.array().items(Joi.string().required()),
    workPlace: Joi.string().required()
})
