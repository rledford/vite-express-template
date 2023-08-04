import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configModule } from '@/modules/config';
import { createLogger, noopLogger } from '@/utils';
import {
  accessLoggerMiddleware,
  errorMiddleware,
  notFoundMiddleware
} from './middlewares';
import { healthModule } from './modules/health';
import { databaseModule } from './modules/database';
import { createErrorFormatter } from './utils/error-formatter';
import { usersModule } from './modules/users';
import { notesModule } from './modules/notes';
import { authModule } from './modules/auth';

export const initApp = async () => {
  const app = express();
  const config = configModule().get();
  const server = new Server(app);
  const logger =
    config.logLevel !== 'none' ? createLogger(config.logLevel) : noopLogger();
  const errorFormatter = createErrorFormatter({
    logger,
    scrubInternal: config.isProd
  });

  logger.info(`Vite Express Template [ ${config.mode} ]`);

  const database = databaseModule({ config: config, logger });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware());

  const health = healthModule();
  const users = usersModule({ db: database.db });
  const auth = authModule({ jwtSecret: 'test', usersService: users.service });
  const notes = notesModule();

  app.use('/auth', auth.controller);
  app.use('/health', health.controller);
  app.use('/users', users.controller);
  app.use('/notes', notes.controller);

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
