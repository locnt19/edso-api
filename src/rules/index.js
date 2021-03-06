import { rule, shield } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server-express';
import { authReq } from './auth';

const isAuthenticated = rule()(async (rootValue, args, context) => {
    const { t } = context;
    await authReq(context);
    if (!context.user) {
        return new AuthenticationError(t('unauthenticated'));
    }
    return true;
});

export const permissions = shield(
    {
        Query: {
            '*': isAuthenticated,
        },
        Mutation: {
            '*': isAuthenticated,
        },
    },
    {
        allowExternalErrors: true,
    },
);
