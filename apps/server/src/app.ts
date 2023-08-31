import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PlatformConfig } from './platform/configuration';
import { database } from './platform/database';
import { errorFormatter } from './platform/utils/error-formatter';
import {
  accessLogger,
  notFoundHandler,
  requestContext,
  errorHandler,
  jwtClaimsContext,
  basicAuthContext,
} from './platform/middleware';
import { createLogger } from './platform/logger';
import { healthModule } from './feature/health';
import { userModule } from './feature/user';
import { noteModule } from './feature/note';
import { jwtPair } from './platform/auth';

type Deps = {
  config: PlatformConfig;
};

export const initApp = async ({ config }: Deps) => {
  const app = express();
  const server = new Server(app);
  const logger = createLogger(config.app.logLevel);
  const { sign, verify } = jwtPair({ secret: config.app.jwtSecret });
  const setClaimsContext = jwtClaimsContext({ verify });
  const setAuthContext = basicAuthContext();

  logger.info(`Vite Express Template [ ${config.app.mode} ]`);

  const db = database({ config: config.db, logger });

  await db.connect();

  app.use(requestContext());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLogger());

  const health = healthModule();
  const user = userModule({
    db: db.connection,
    sign,
    setClaimsContext,
    setAuthContext,
  });
  const note = noteModule({ db: db.connection, setClaimsContext });

  app.use(health.controller);
  app.use(user.controller);
  app.use(note.controller);

  app.use(notFoundHandler());

  app.use(
    errorHandler({
      formatError: errorFormatter({
        logger,
        scrubInternal: config.app.isProd,
      }),
    }),
  );

  return {
    start: async () => {
      server.listen(config.app.port, () => {
        logger.info(`Listening on port ${config.app.port}`);
      });
    },
    stop: async () => {
      await db.disconnect();

      if (server.listening) {
        server.close();
        server.closeAllConnections();
      }
    },
  };
};
