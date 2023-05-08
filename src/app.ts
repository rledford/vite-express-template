import { Server } from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from '@/config';
import { logger } from '@/utils';
import { accessLoggerMiddleware } from './middlewares';
import { healthModule } from './modules/health';
import { mongoDatabase } from './database';

const app = express();
const server = new Server(app);

export const bootstrap = async () => {
  logger.info(`Vite Express Template [ ${config.mode} ]`);
  const db = mongoDatabase({
    uri: config.mongoUri,
    logger
  });

  await db.connect();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(accessLoggerMiddleware);

  app.use('/health', healthModule());
};

export const start = () => {
  server.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });
};
