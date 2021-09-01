import { rule, shield, and, or, allow } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server-express';
import { registerAdmin } from '../graphql/mutations';

const isAuthenticated = rule()(async (rootValue, args, context, info) => {
    if (!context.user) {
        return new AuthenticationError('Please login');
    }
    return true;
});

const isSuperAdmin = rule()(async (rootValue, args, context, info) => {
    if (context.user.role !== 'Admin') {
        return new AuthenticationError('Unauthorized Access');
    }
    return true;
});

export const permissions = shield(
    {
        Query: {
            // TODO: Remove comments below as development
            '*': isAuthenticated,
            getCenter: and(isAuthenticated, isSuperAdmin),
            getClass: and(isAuthenticated, isSuperAdmin),
            getMe: isAuthenticated
        },
        Mutation: {
            // TODO: Remove comments below as development
            '*': isAuthenticated,
            loginUser: allow,
            registerAdmin: allow,
            deactivateAccount: and(isAuthenticated, isSuperAdmin),
            registerTeacher: and(isAuthenticated, isSuperAdmin)
        }
    },
    {
        allowExternalErrors: true
    }
);
