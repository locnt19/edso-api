import Joi from 'joi';
import { baseUserRegisterInputSchema } from '.';

export const teacherRegisterInputSchema = baseUserRegisterInputSchema.keys({
    level: Joi.valid('Bachelor', 'Master', 'PhD').required(),
    classIDs: Joi.array().items(Joi.string()),
    workPlace: Joi.string().required()
})

export const teacherUpdateInputSchema = baseUserRegisterInputSchema.keys({
    level: Joi.valid('Bachelor', 'Master', 'PhD').optional(),
    classIDs: Joi.array().items(Joi.string())
})
