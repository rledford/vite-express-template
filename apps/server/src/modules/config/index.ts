import dotenv from 'dotenv';
import { Config, EnvSchema } from './types';

interface ConfigModule {
  get: () => Readonly<Config>;
}

export const configModule = (): ConfigModule => {
  const env = EnvSchema.parse(
    Object.assign({}, process.env, dotenv.config().parsed)
  );

  const config = {
    logLevel: env.LOG_LEVEL,
    mode: env.NODE_ENV,
    port: env.PORT,
    db: {
      type: env.DB_TYPE,
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_DATABASE
    },
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development'
  };

  return {
    get: () => config
  };
};
