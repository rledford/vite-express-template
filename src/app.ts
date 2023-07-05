import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configModule } from '@/modules/config';
import { createLogger, noopLogger } from '@/utils';
import { accessLoggerMiddleware } from './middlewares';
import { healthModule } from './modules/health';
import { databaseModule } from './modules/database';
import { journalModule } from './modules/journal';

export const initApp = async () => {
  const app = express();
  const config = configModule().get();
  const server = new Server(app);
  const logger =
    config.logLevel !== 'none' ? createLogger(config.logLevel) : noopLogger();

  logger.info(`Vite Express Template [ ${config.mode} ]`);

  const database = databaseModule({ config: config.db, logger });

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware());

  const health = healthModule();
  const journal = journalModule({ db: database.db });

  app.use('/health', health.controller);
  app.use('/journals', journal.controller);

  return {
    start: async () => {
      await database.connect();
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
