import UserModel from '../../models/BaseUser';
import { UserInputError } from 'apollo-server-express';
import mongoose from 'mongoose';
import BaseUser from '../../models/BaseUser';

export const getMe = async (rootValue, args, context, info) => {
    try {
        let user = await BaseUser.findOne({ hash: context.user.userHash });
        // let user = await BaseUser.find({});
        return user;
    } catch (e) {
        return e;
    }
};
