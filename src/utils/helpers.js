import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { introspectionPlugin } from './graphql';
import mongoose from 'mongoose';
import Hashids from 'hashids';

const salt = 'edso_team';
const hashids = new Hashids(salt);

const isProduction = process.env.NODE_ENV === 'production';
dotenv.config();

export const paginationLabelsOptions = {
    totalDocs: 'total',
    docs: 'items',
    perPage: 'limit',
    currentPage: 'page',
    next: 'nextPage',
    prev: 'prevPage',
    pageCount: 'totalPages',
    slNo: 'pagingCounter'
};

export function createApolloExpressServer(apolloServerExpressConfig = {}) {
    const { plugins: additionalPlugins = [] } = apolloServerExpressConfig;

    const apolloPlugins = [];

    if (isProduction && process.env.INTROSPECTION_TOKEN) {
        apolloPlugins.push(
            introspectionPlugin({
                type: 'header-token',
                name: 'x-app-introspect-auth', // header name
                value: [process.env.INTROSPECTION_TOKEN] // valid header values
            })
        );
    }
    return new ApolloServer({
        ...apolloServerExpressConfig,
        plugins: [...apolloPlugins, ...additionalPlugins]
    });
}

export function createI18nMiddleware(configs) {
    const resources = {};
    for (const config of configs) {
        resources[config.code] = { translation: config.config };
    }
    i18next.use(i18nextMiddleware.LanguageDetector).init({
        detection: {
            order: ['header'],
            lookupHeader: 'accept-language'
        },
        preload: configs.map((e) => e.code),
        whitelist: configs.map((e) => e.code),
        fallbackLng: 'en',
        resources
    });
    return i18nextMiddleware.handle(i18next);
}

export function sdkAuthMiddleware(req, res, next) {
    try {
        const authorization = req.headers['x-sdk-token'];
        if (!authorization || !authorization.includes('Bearer')) {
            return next();
        }
        const accessToken = authorization.split(' ')[1];

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        if (!decoded) {
            return next();
        }
        req.sdkUser = decoded;
        return next();
    } catch (e) {
        return next();
    }
}

export function generateHashFromId(id) {
    return hashids.encodeHex(id.toString());
}

export function generateIdFromHash(hash) {
    return mongoose.Types.ObjectId(hashids.decodeHex(hash));
}
