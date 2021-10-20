import { rule, shield, and, or, allow } from 'graphql-shield';
import { AuthenticationError } from 'apollo-server-express';
import { registerAdmin } from '../graphql/mutations';
import { getUserById } from '../graphql/queries';

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

const isManager = rule()(async (rootValue, args, context, info) => {
    if (context.user.role !== 'Manager') {
        return new AuthenticationError('Unauthorized Access');
    }
    return true;
});

const isSupport = rule()(async (rootValue, args, context, info) => {
    if (context.user.role !== 'Support') {
        return new AuthenticationError('Unauthorized Access');
    }
    return true;
});

const isTeacher = rule()(async (rootValue, args, context, info) => {
    if (context.user.role !== 'Teacher') {
        return new AuthenticationError('Unauthorized Access');
    }
    return true;
});

const isStudent = rule()(async (rootValue, args, context, info) => {
    if (context.user.role !== 'Student') {
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
            getMe: isAuthenticated,
            getUserById: and(isAuthenticated, or(isSuperAdmin, isManager, isSupport))
        },
        Mutation: {
            // TODO: Remove comments below as development
            '*': isAuthenticated,
            loginUser: allow,
            registerAdmin: allow,
            deactivateAccount: and(isAuthenticated, isSuperAdmin),
            registerManager: and(isAuthenticated, isSuperAdmin),
            registerSupport: and(isAuthenticated, isManager),
            registerTeacher: and(isAuthenticated, or(isManager, isSupport)),
            registerStudent: and(isAuthenticated, or(isManager, isSupport))
        }
    },
    {
        allowExternalErrors: true
    }
);
