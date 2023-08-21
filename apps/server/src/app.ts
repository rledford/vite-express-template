import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PlatformConfig } from './platform/configuration';
import { database } from './platform/database';
import { errorFormatter } from './platform/utils/error-formatter';
import {
  accessLoggerMiddleware,
  basicMiddleware,
  errorMiddleware,
  jwtMiddleware,
  notFoundMiddleware,
  requestContextMiddleware,
} from './platform/middleware';
import { createLogger } from './platform/logger';
import { healthModule } from './feature/health';
import { currentUserModule, userModule } from './feature/user';
import { jwtPair } from './platform/auth';
import { noteModule } from './feature/note';

type Deps = {
  config: PlatformConfig;
};

export const initApp = async ({ config }: Deps) => {
  const app = express();
  const server = new Server(app);
  const logger = createLogger(config.app.logLevel);
  const jwt = jwtPair({ secret: config.app.jwtSecret });
  const jwtGuard = jwtMiddleware({ verify: jwt.verify });
  const basicGuard = basicMiddleware();

  logger.info(`Vite Express Template [ ${config.app.mode} ]`);

  const db = database({ config: config.db, logger });

  await db.connect();

  app.use(requestContextMiddleware());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware());

  const health = healthModule();
  const user = userModule({ db: db.connection, jwtGuard });
  const currentUser = currentUserModule({
    db: db.connection,
    jwtGuard,
    basicGuard,
    jwtSign: jwt.sign,
  });
  const note = noteModule({ db: db.connection, jwtGuard });

  app.use('/health', health.controller);
  app.use('/', currentUser.controller);
  app.use('/users', user.controller);
  app.use('/notes', note.controller);

  app.use(notFoundMiddleware());

  app.use(
    errorMiddleware({
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
