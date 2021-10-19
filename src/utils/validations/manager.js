import Joi from 'joi';
import { baseUserRegisterInputSchema, baseUserUpdateInputSchema } from '.';

export const managerRegisterInputSchema = baseUserRegisterInputSchema.keys({
    centerId: Joi.string().required(),
    info: Joi.string()
})

export const managerUpdateInputSchema = baseUserUpdateInputSchema.keys({
    info: Joi.string()
})
