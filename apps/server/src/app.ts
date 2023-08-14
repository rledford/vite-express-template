import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createLogger, noopLogger } from '@/utils';
import {
  accessLoggerMiddleware,
  errorMiddleware,
  notFoundMiddleware
} from './middlewares';
import { databaseModule } from './modules/database';
import { healthModule } from './modules/health';
import { authModule } from './modules/auth';
import { userModule } from './modules/user';
import { noteModule } from './modules/note';
import { createErrorFormatter } from './utils/error-formatter';
import { Config } from './modules/config/types';

type Deps = {
  config: Config;
};

export const initApp = async ({ config }: Deps) => {
  const app = express();
  const server = new Server(app);
  const logger =
    config.logLevel !== 'none' ? createLogger(config.logLevel) : noopLogger();
  const errorFormatter = createErrorFormatter({
    logger,
    scrubInternal: config.isProd
  });

  logger.info(`Vite Express Template [ ${config.mode} ]`);

  const database = databaseModule({ config: config.db, logger });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware());

  const auth = authModule({
    db: database.db,
    jwtSecret: 'test'
  });

  const health = healthModule();
  const user = userModule({ db: database.db, jwt: auth.guards.jwt });
  const note = noteModule({ db: database.db, jwt: auth.guards.jwt });

  app.use('/', auth.controller);
  app.use('/health', health.controller);
  app.use('/users', user.controller);
  app.use('/notes', note.controller);

  app.use(notFoundMiddleware());

  app.use(errorMiddleware({ formatter: errorFormatter }));

  return {
    start: async () => {
      server.listen(config.port, () => {
        logger.info(`Listening on port ${config.port}`);
      });
    },
    stop: async () => {
      await database.disconnect();

      if (server.listening) {
        server.close();
        server.closeAllConnections();
      }
    }
  };
};
