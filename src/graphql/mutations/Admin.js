import { UserInputError } from 'apollo-server-express';
import { generateHashFromId, generateIdFromHash } from '../../utils/helpers';
import Admin from '../../models/Admin';
import BaseUser from '../../models/BaseUser';
import AccessToken from '../../models/AccessToken';
import { adminRegisterInputSchema, generateIpFromReq } from '../../utils';

import bcrypt from 'bcryptjs';

// export const registerAdmin = async (rootValue, { userInfo }) => {
//     try {
//         let foundUser = await BaseUser.emailExist(userInfo.email);
//         if (foundUser) {
//             return new UserInputError('This email has been used');
//         }
//         console.log(userInfo)
//         const { error } = baseUserRegisterInputSchema.validate(userInfo);
//         if (error) {
//             return new UserInputError(error.message, error);
//         }
//         userInfo.role = 'Admin';
//         userInfo.password = bcrypt.hashSync(userInfo.password, 10);
//         foundUser = await new BaseUser(userInfo);
//         foundUser.hash = generateHashFromId(foundUser._id);
//         await foundUser.save();

//         return {
//             success: true,
//             msg: 'Register new base user successfully',
//             payload: foundUser
//         };
//     } catch (e) {
//         return e;
//     }
// }

export const registerAdmin = async (rootValue, { adminInfo }) => {
    try {
        let foundUser = await Admin.emailExist(adminInfo.email);
        if (foundUser) {
            return new UserInputError('This email has been used');
        }
        const { error } = adminRegisterInputSchema.validate(adminInfo);
        if (error) {
            return new UserInputError(error.message, error);
        }
        adminInfo.password = bcrypt.hashSync(adminInfo.password, 10);
        foundUser = await new Admin(adminInfo);
        foundUser.hash = generateHashFromId(foundUser._id);
        await foundUser.save();

        return {
            success: true,
            msg: 'Register new admin successfully',
            payload: foundUser
        };
    } catch (e) {
        return e;
    }
}

export const deactivateAccount = async (rootValue, { email }) => {
    try {
        let foundUser = await BaseUser.emailExist(email);
        if (!foundUser) {
            return new UserInputError('User/Email does not exist!');
        }
        const filter = { email };
        const update = { isActive: false };
        let user = await BaseUser.findOneAndUpdate(filter, update, { new: true });
        return {
            success: true,
            msg: 'Deactivate user account successfully',
            payload: user
        };
    } catch (e) {
        return e;
    }
}


