import Joi from 'joi';
import { baseUserRegisterInputSchema, baseUserUpdateInputSchema } from '.';

export const supportRegisterInputSchema = baseUserRegisterInputSchema.keys({
    centerId: Joi.string().required(),
    info: Joi.string()
})

export const supportUpdateInputSchema = baseUserUpdateInputSchema.keys({
    info: Joi.string()
})
