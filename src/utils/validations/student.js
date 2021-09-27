import Joi from 'joi';
import { baseUserRegisterInputSchema, baseUserUpdateInputSchema } from '.';

export const studentRegisterInputSchema = baseUserRegisterInputSchema.keys({
    schoolId: Joi.string().required(),
    reports: Joi.array().items(Joi.string())
})

export const studentUpdateInputSchema = baseUserUpdateInputSchema.keys({
    info: Joi.string()
})
