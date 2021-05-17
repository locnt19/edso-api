import {
    ObjectIDResolver,
    EmailAddressResolver,
    DateTimeResolver,
    DateResolver,
    URLResolver,
    JSONObjectResolver
} from 'graphql-scalars';

export const resolvers = {
    Query: {
        someQuery: (root, args, context, info) => {
            return 'Some Query Is Awesome';
        }
    },
    Mutation: {
        someMutation: (root, args, context, info) => {
            return args.text;
        }
    },
    ObjectID: ObjectIDResolver,
    JSONObject: JSONObjectResolver,
    EmailAddress: EmailAddressResolver,
    DateTime: DateTimeResolver,
    Date: DateResolver,
    URL: URLResolver
};
