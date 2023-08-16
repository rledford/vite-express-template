import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { platformDatabase } from './platform/database';
import { AppConfig, DatabaseConfig } from './platform/config/config.schema';
import { errorFormatter } from './utils/error-formatter';
import {
  accessLoggerMiddleware,
  errorMiddleware,
  notFoundMiddleware
} from './middleware';
import { healthModule } from './feature/health';
import { authModule } from './feature/auth';
import { userModule } from './feature/user';
import { noteModule } from './feature/note';
import { appLogger } from './platform/logger';

type Deps = {
  config: {
    app: AppConfig;
    db: DatabaseConfig;
  };
};

export const initApp = async ({ config }: Deps) => {
  const app = express();
  const server = new Server(app);
  const logger = appLogger(config.app.logLevel);

  logger.info(`Vite Express Template [ ${config.app.mode} ]`);

  const database = platformDatabase({ config: config.db, logger });

  await database.connect();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware());

  const auth = authModule({
    db: database.db,
    jwtSecret: config.app.jwtSecret
  });

  const health = healthModule();
  const user = userModule({ db: database.db, jwt: auth.guards.jwt });
  const note = noteModule({ db: database.db, jwt: auth.guards.jwt });

  app.use('/', auth.controller);
  app.use('/health', health.controller);
  app.use('/users', user.controller);
  app.use('/notes', note.controller);

  app.use(notFoundMiddleware());

  app.use(
    errorMiddleware({
      formatError: errorFormatter({
        logger,
        scrubInternal: config.app.isProd
      })
    })
  );

  return {
    start: async () => {
      server.listen(config.app.port, () => {
        logger.info(`Listening on port ${config.app.port}`);
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
