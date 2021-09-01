import Joi from 'joi';
import { baseUserRegisterInputSchema } from '.';

export const adminRegisterInputSchema = baseUserRegisterInputSchema.keys({
    info: Joi.string()
    // level: Joi.valid('Bachelor', 'Master', 'PhD').required(),
    // classIDs: Joi.array().items(Joi.string())
})
