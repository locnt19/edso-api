import moment from 'moment';
import {
    graphql as runGraphQl,
    GraphQLBoolean as Boolean,
    GraphQLError,
    GraphQLFloat as Float,
    GraphQLID as ID,
    GraphQLInt as Int,
    GraphQLList as List,
    GraphQLNonNull as Required,
    GraphQLObjectType,
    GraphQLString as String,
} from 'graphql';
import dotenv from 'dotenv';
import {
    GraphQLRequest,
    GraphQLRequestContext,
} from 'apollo-server-plugin-base';
import { ForbiddenError } from 'apollo-server-express';
import path from 'path';
import fs from 'fs';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { combineResolvers } from 'graphql-resolvers';

import { introspectSchema, makeRemoteExecutableSchema } from 'graphql-tools';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

export const resolveId = (instance) => instance._id || instance.id;
export const resolveDateTime = (instance, params, options, { fieldName }) =>
    moment.utc(instance[fieldName]);
const resolve = (instance, params, options, { fieldName }) =>
    instance[fieldName];

export const generateResolver = (type, resolver = resolve) => {
    return (description = 'Self descriptive') => ({
        type,
        description,
        resolve: resolver,
    });
};

const generatePrimitive = (
    type,
    required = false,
    defaultValue = undefined,
) => {
    if (required) {
        return (description = 'Self descriptive') => ({
            type: new Required(type),
            description,
        });
    }

    return (description = 'Self descriptive') => ({
        type,
        description,
        defaultValue,
    });
};

export const Resolvers = {
    generateResolver,
    string: generateResolver(String),
    id: generateResolver(ID, resolveId),
    int: generateResolver(Int),
    float: generateResolver(Float),
    boolean: generateResolver(Boolean),
    stringList: generateResolver(new List(String)),
    datetime: generateResolver(String, resolveDateTime),
    ofType: (type, description = 'Self descriptive', resolver = resolve) => ({
        type,
        description,
        resolve: resolver,
    }),
    listOfType: (
        type,
        description = 'Self descriptive',
        resolver = resolve,
    ) => ({
        type: new List(type),
        description,
        resolve: resolver,
    }),
};

export const Primitives = {
    string: generatePrimitive(String),
    requiredString: generatePrimitive(String, true),
    int: generatePrimitive(Int),
    requiredInt: generatePrimitive(Int, true, 0),
    float: generatePrimitive(Float),
    requiredFloat: generatePrimitive(Float, true, 0),
    boolean: generatePrimitive(Boolean),
    requiredBoolean: generatePrimitive(Boolean, true, false),
    ofType: (
        type,
        defaultValue = undefined,
        description = 'Self descriptive',
    ) => ({ type, defaultValue, description }),
    list: (
        type,
        defaultValue = undefined,
        description = 'Self descriptive',
    ) => ({
        type: new List(type),
        defaultValue,
        description,
    }),
    requiredList: (
        type,
        defaultValue = [],
        description = 'Self descriptive',
    ) => ({ type: new Required(new List(type)), defaultValue, description }),
    requiredOfType: (
        type,
        defaultValue = undefined,
        description = 'Self descriptive',
    ) => ({ type: new Required(type), defaultValue, description }),
};

export function executeGraphQl(
    schemas,
    query,
    rootValues = {},
    context,
    variables = {},
) {
    return runGraphQl(schemas, query, rootValues, context, variables);
}

export function mutationOf(dataType, name, description = 'Self descriptive') {
    const fields = {
        success: Resolvers.boolean(
            'This flag to tell if the Mutation is success or not',
        ),
        msg: Resolvers.string(),
    };
    if (dataType) {
        fields.payload = Resolvers.ofType(dataType);
    }
    return new GraphQLObjectType({
        name,
        description,
        fields: () => fields,
    });
}

export async function getIntrospectSchema(serviceName) {
    const isProduction = process.env.NODE_ENV === 'production';
    let introspectUrl = process.env.BASE_URL;
    if (!isProduction) {
        const { PORT } = dotenv.parse(
            fs.readFileSync(path.resolve(`${serviceName}Service.env`)),
        );
        introspectUrl = `http://localhost:${PORT || 1337}/`;
    }
    const microServiceLinkHttp = createHttpLink({
            uri: `${introspectUrl}${serviceName}/graphql`,
            fetch,
        }),
        microServiceLinkWithContext = setContext((request, prevContext) => {
            const nextContext = {
                users: { foo: 'bar' },
            };
            if (prevContext?.graphqlContext?.req) {
                nextContext.headers = prevContext?.graphqlContext?.req.headers;
            }
            return nextContext;
        }).concat(microServiceLinkHttp),
        microServiceLink = onError(({ response }) => {
            if (response) {
                response.errors = response.errors.map(
                    (err) => new GraphQLError(err.message),
                );
            }
        }).concat(microServiceLinkWithContext),
        microServiceRemoteSchema = await introspectSchema(microServiceLink);
    return makeRemoteExecutableSchema({
        schema: microServiceRemoteSchema,
        link: microServiceLink,
    });
}

export function middlewareResolver(resolver, middleware) {
    return {
        ...resolver,
        resolve: combineResolvers(...middleware, resolver.resolve),
    };
}

const REGEX_INTROSPECTION_QUERY = /\b(__schema|__type)\b/;

export const isIntrospectionRequest = (request: GraphQLRequest) =>
    typeof request.query === 'string' &&
    REGEX_INTROSPECTION_QUERY.test(request.query);
/**
 * Validate a given token against a single or multiple valid values.
 * @param value
 * @param shouldMatch
 */
const isValidToken = (value: string | null, shouldMatch: string | string[]) => {
    if (!value || !Array.isArray(shouldMatch)) {
        return false;
    }

    return shouldMatch.includes(value);
};

export function introspectionPlugin(options = Object.create(null)) {
    return {
        requestDidStart(context: GraphQLRequestContext<any>) {
            const { request } = context;
            if (isIntrospectionRequest(request) && options.type) {
                if (options.type === 'header-token' && request.http) {
                    const { name, value } = options;
                    const { headers } = request.http;

                    if (
                        !headers.has(name) ||
                        !isValidToken(headers.get(name), value)
                    ) {
                        throw new ForbiddenError(
                            'You are not authorized to perform this request.',
                        );
                    }
                }
            }
        },
    };
}
