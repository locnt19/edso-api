import {
    ObjectIDResolver,
    EmailAddressResolver,
    DateTimeResolver,
    DateResolver,
    URLResolver,
    JSONObjectResolver
} from 'graphql-scalars';

import { getCenter } from './queries';
import { createCenter, updateCenter } from './mutations';

export const resolvers = {
    Query: {
        someQuery: (root, args, context, info) => {
            return 'Some Query Is Awesome';
        },
        getCenter
    },
    Mutation: {
        someMutation: (root, args, context, info) => {
            return args.text;
        },
        createCenter,
        updateCenter
    },
    ObjectID: ObjectIDResolver,
    JSONObject: JSONObjectResolver,
    EmailAddress: EmailAddressResolver,
    DateTime: DateTimeResolver,
    Date: DateResolver,
    URL: URLResolver
};
