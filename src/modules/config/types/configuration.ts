import { EnvMode } from './env';
import { MongoConfig } from './db';
import { LogLevel } from './log';

export interface Config {
  logLevel: LogLevel;
  mode: EnvMode;
  port: number;
  db: MongoConfig;
  isProd: boolean;
  isDev: boolean;
}
