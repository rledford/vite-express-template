import { EnvMode } from '../types';

export interface Configuration {
  mode: EnvMode;
  port: number;
  mongoUri: string;
  isProd: boolean;
  isDev: boolean;
}
