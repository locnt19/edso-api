require('dotenv').config();
import http from 'http';
import {
  createServer,
  mongooseUtils,
  redisUtils,
  utils,
} from '@gugotech/backend-utils';
import { makeExecutableSchema } from 'apollo-server-express';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import express from 'express';
import morgan from 'morgan';
import { resolvers, typeDefs } from './src/graphql';
import cors from 'cors';
import useragent from 'express-useragent';
import bodyParser from 'body-parser';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from './src/rules';

const PORT = parseInt(process.env.PORT || 3000, 10);

global.redis = redisUtils.createRedisClient();
global.pubsub = new RedisPubSub({
  publisher: redisUtils.createRedisClient(),
  subscriber: redis,
});

const servicePath = process.env.SERVICE_PATH || 'chat';

const app = express();

app.use(
  cors(),
  bodyParser.json(),
  useragent.express(),
  morgan('dev'),
  createServer.createI18nMiddleware([
    { code: 'en', config: require('./src/utils/i18n/en.json') },
    { code: 'vi', config: require('./src/utils/i18n/vi.json') },
  ]),
  createServer.sdkAuthMiddleware,
);

app.get('/health-check', (req, res) => res.status(200).send('OK'));

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = createServer.createApolloExpressServer({
  schema: applyMiddleware(schema, permissions),
  introspection: true,
  subscriptions: {
    path: `/${servicePath}/graphql/subscriptions`,
    onConnect: (connectionParams) => {
      /*if (connectionParams.authToken) {
        return tnccAuthSdk
          .verifyToken(connectionParams.authToken)
          .then((user) => {
            return {
              currentUser: user,
            };
          });
      }
      throw new Error('Missing auth token!');*/
    },
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
      ip: utils.generateIpFromReq(req),
    };
  },
});

apolloServer.applyMiddleware({
  app,
  path: `/${servicePath}/graphql`,
});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, async () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`,
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`,
  );
  await mongooseUtils.connectMongoDb();
});
