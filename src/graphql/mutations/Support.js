import Support from "../../models/Support";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { supportRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerSupport = async (parent, { input }, context, info) => {
    try {
        let newUser = await Support.emailExist(input.email);
        if (newUser) {
            return new UserInputError('This email has been used');
        }
        const { error } = supportRegisterInputSchema.validate(input);
        if (error) {
            return new UserInputError(error.message, error);
        }
        input.password = bcrypt.hashSync(input.password, 10);
        newUser = await new Support(input);
        newUser.hash = generateHashFromId(newUser._id);
        await newUser.save();

        return {
            success: true,
            msg: 'Register new Support successfully',
            payload: newUser
        };
    } catch (e) {
        return e;
    }
}
