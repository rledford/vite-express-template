import { EnvMode } from './env';
import { DbConfig } from './db';
import { LogLevel } from './log';

export interface Config {
  logLevel: LogLevel;
  mode: EnvMode;
  port: number;
  db: DbConfig;
  isProd: boolean;
  isDev: boolean;
}
