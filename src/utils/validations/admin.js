import Joi from 'joi';
import { baseUserRegisterInputSchema, baseUserUpdateInputSchema } from '.';

export const adminRegisterInputSchema = baseUserRegisterInputSchema.keys({
    info: Joi.string()
    // level: Joi.valid('Bachelor', 'Master', 'PhD').required(),
    // classIDs: Joi.array().items(Joi.string())
})

export const adminUpdateInputSchema = baseUserUpdateInputSchema.keys({
    info: Joi.string()
})
