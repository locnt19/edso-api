import UserModel from '../../models/BaseUser';
import { UserInputError } from 'apollo-server-express';

export const getUserById = async (rootValue, { id }, context) => {
    try {
        let foundUser = await UserModel.idExist(id);
        if (!foundUser) {
            return new UserInputError('User does not exist!');
        }
        return foundUser;
    } catch (e) {
        return e;
    }
};
