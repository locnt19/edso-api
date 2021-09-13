import Manager from "../../models/Manager";
import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import BaseUser from '../../models/BaseUser';
import AccessTokenModel from '../../models/AccessToken';
import { managerRegisterInputSchema } from '../../utils';
import bcrypt from 'bcryptjs';




export const registerManager = async (parent, { input }, context, info) => {
    try {
        let newUser = await Manager.emailExist(input.email);
        if (newUser) {
            return new UserInputError('This email has been used');
        }
        const { error } = managerRegisterInputSchema.validate(input);
        if (error) {
            return new UserInputError(error.message, error);
        }
        input.password = bcrypt.hashSync(input.password, 10);
        newUser = await new Manager(input);
        newUser.hash = generateHashFromId(newUser._id);
        await newUser.save();

        return {
            success: true,
            msg: 'Register new Manager successfully',
            payload: newUser
        };
    } catch (e) {
        return e;
    }
}
