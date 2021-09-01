import { UserInputError } from 'apollo-server-express';
import BaseUser from '../../models/BaseUser';
import AccessToken from '../../models/AccessToken';
import { baseUserRegisterInputSchema, generateIpFromReq } from '../../utils';
import jwt from 'jsonwebtoken';

export const loginUser = async (rootValue, { email, password }, context) => {
    try {

        let foundUser = await BaseUser.emailExist(email);
        if (!foundUser) {
            return new UserInputError('wrongCredential-email');
        }
        const comparePassword = foundUser.comparePassword(password);
        if (!comparePassword) {
            return new UserInputError('wrongCredential-password');
        }
        let accessToken = jwt.sign(
            {
                userHash: foundUser.hash,
                role: foundUser.role
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );
        await AccessToken.deactivatePreviousToken(foundUser._id);
        await new AccessToken({
            ownerId: foundUser.hash,
            token: accessToken,
            isActive: true,
            ip: generateIpFromReq(context.req),
            device: context.req.headers['user-agent']
        }).save();

        return {
            success: true,
            msg: 'Login successfully',
            payload: { accessToken }
        };
    } catch (e) {
        return e;
    }
};

export const logoutUser = async (rootValue, args, context, info) => {
    try {
        const num = await AccessToken.deleteMany({ ownerId: context.user.userId });
        console.log('Doc deleted', num);
        return {
            success: true,
            msg: 'Logout successfully',
            payload: { accessToken: null }
        };
    } catch (e) {
        return e;
    }
}

export const updateUser = async (rootValue, args, context, info) => {
    try {
        const filter = { hash: context.user.userHash };
        const update = { args };
        const { error } = baseUserRegisterInputSchema.validate(args);
        if (error) {
            return new UserInputError(error.message, error);
        }
        let user = await BaseUser.findOneAndUpdate(filter, update, { new: true });
        console.log(user);
        return user;
    } catch (e) {
        return e;
    }
}
