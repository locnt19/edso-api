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
    getMe
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
    loginUser,
    logoutUser
} from './mutations';

import { BaseUserResolver } from './types';

export const resolvers = {
    Query: {
        someQuery: (root, args, context, info) => {
            return 'Some Query Is Awesome';
        },
        getCenter,
        getClass,
        getMe
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
        loginUser,
        logoutUser
    },
    BaseUser: BaseUserResolver,
    ObjectID: ObjectIDResolver,
    JSONObject: JSONObjectResolver,
    EmailAddress: EmailAddressResolver,
    DateTime: DateTimeResolver,
    Date: DateResolver,
    URL: URLResolver
}
