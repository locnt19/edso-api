import { UserInputError } from 'apollo-server-express';
import BaseUser from '../../models/BaseUser';
import { changeObjectToDotNotationFormat } from '../../utils/helpers';
import escapeStringRegexp from 'escape-string-regexp';

export const getMe = async (rootValue, args, context, info) => {
    try {
        let user = await BaseUser.findOne({ hash: context.user.userHash });
        // let user = await BaseUser.find({});
        return user;
    } catch (e) {
        return e;
    }
};

export const getUserById = async (rootValue, { userHash }, context, info) => {
    try {
        let user = await BaseUser.findOne({ hash: userHash });
        if (!user) {
            return new UserInputError('User does not exist!');
        }
        return user;
    } catch (e) {
        return e;
    }
};

export const getListUser = async (rootValue, args, context, info) => {
    try {
        const { paginate, filter } = args;

        const options = {
            page: paginate && paginate.page ? paginate.page : 1,
            limit: paginate && paginate.limit ? paginate.limit : 10
        };

        const filterConvert = filter && changeObjectToDotNotationFormat(filter);

        if (filterConvert) {
            for (const key in filterConvert) {
                if (Object.hasOwnProperty.call(filterConvert, key)) {
                    const element = filterConvert[key];
                    const $regex = escapeStringRegexp(element);

                    filterConvert[key] = { $regex: new RegExp($regex, 'i') };
                }
            }
        }

        const data = await BaseUser.paginate(filterConvert, options);

        return data;
    } catch (e) {
        return e;
    }
};
