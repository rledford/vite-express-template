import { EnvMode } from './env';
import { DatabaseConfig } from './db';
import { LogLevel } from './log';

export interface Config {
  logLevel: LogLevel;
  mode: EnvMode;
  port: number;
  jwtSecret: string;
  db: DatabaseConfig;
  isProd: boolean;
  isDev: boolean;
}
