import dotenv from 'dotenv';
import http from 'http';
import {
    connectMongoDb,
    createI18nMiddleware,
    createApolloExpressServer,
    generateIpFromReq
} from './utils';
import {
    authenticationMiddleware
} from './middleware/authentication';
import { makeExecutableSchema } from 'apollo-server-express';
import express from 'express';
import morgan from 'morgan';
import { resolvers, typeDefs } from './graphql';
import cors from 'cors';
import useragent from 'express-useragent';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './rules';

dotenv.config();

const PORT = parseInt(process.env.PORT || 3000, 10);

const servicePath = process.env.SERVICE_PATH || 'edso-api';

const app = express();

app.use(
    cors(),
    express.json(),
    useragent.express(),
    morgan('dev'),
    authenticationMiddleware,
    createI18nMiddleware([
        { code: 'en', config: require('./utils/i18n/en.json') },
        { code: 'vi', config: require('./utils/i18n/vi.json') }
    ])
);

app.get('/health-check', (req, res) => res.status(200).send('OK'));

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: { requireResolversForResolveType: false }
});

const apolloServer = createApolloExpressServer({
    schema: applyMiddleware(schema, permissions),
    introspection: true,
    subscriptions: {
        path: `/${servicePath}/graphql/subscriptions`,
        onConnect: (connectionParams) => { }
    },
    context: async ({ req, res, connection }) => {
        if (connection) {
            return connection.context;
        }
        return {
            t: req.t,
            req,
            useragent: req.useragent,
            res,
            ip: generateIpFromReq(req),
            user: req.headers.user ? req.headers.user : null
        };
    }
});

apolloServer.applyMiddleware({
    app,
    path: `/${servicePath}/graphql`
});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, async () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(
        `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
    );
    try {
        await connectMongoDb();
    } catch (e) {
        return e;
    }
});
