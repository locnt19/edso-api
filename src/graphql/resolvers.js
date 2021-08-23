import {
    ObjectIDResolver,
    EmailAddressResolver,
    DateTimeResolver,
    DateResolver,
    URLResolver,
    JSONObjectResolver
} from 'graphql-scalars';

import { getCenter, getClass } from './queries';

import {
    createCenter,
    updateCenter,
    createClass,
    updateClass
} from './mutations';

export const resolvers = {
    Query: {
        someQuery: (root, args, context, info) => {
            return 'Some Query Is Awesome';
        },
        getCenter,
        getClass
    },
    Mutation: {
        someMutation: (root, args, context, info) => {
            return args.text;
        },
        createCenter,
        updateCenter,
        createClass,
        updateClass
    },
    ObjectID: ObjectIDResolver,
    JSONObject: JSONObjectResolver,
    EmailAddress: EmailAddressResolver,
    DateTime: DateTimeResolver,
    Date: DateResolver,
    URL: URLResolver
};
