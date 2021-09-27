import {
    ObjectIDResolver,
    EmailAddressResolver,
    DateTimeResolver,
    DateResolver,
    URLResolver,
    JSONObjectResolver
} from 'graphql-scalars';

import {
    getCenter,
    getClass,
    getMe,
    getUserById,
    getListUser
} from './queries';

import {
    createCenter,
    updateCenter,
    createClass,
    updateClass,
    registerAdmin,
    deactivateAccount,
    registerTeacher,
    registerStudent,
    registerManager,
    registerSupport,
    loginUser,
    logoutUser,
    updateUser
} from './mutations';

import { BaseUserResolver, UserResolver } from './types';

export const resolvers = {
    Query: {
        someQuery: (root, args, context, info) => {
            return 'Some Query Is Awesome';
        },
        getCenter,
        getClass,
        getMe,
        getUserById,
        getListUser
    },
    Mutation: {
        someMutation: (root, args, context, info) => {
            return args.text;
        },
        createCenter,
        updateCenter,
        createClass,
        updateClass,
        registerAdmin,
        deactivateAccount,
        registerTeacher,
        registerStudent,
        registerManager,
        registerSupport,
        loginUser,
        logoutUser,
        updateUser
    },
    BaseUser: BaseUserResolver,
    ObjectID: ObjectIDResolver,
    JSONObject: JSONObjectResolver,
    EmailAddress: EmailAddressResolver,
    DateTime: DateTimeResolver,
    Date: DateResolver,
    URL: URLResolver
}
