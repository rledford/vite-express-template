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
      type: env.MONGO_TYPE,
      host: env.MONGO_HOST,
      port: env.MONGO_PORT,
      username: env.MONGO_USER,
      password: env.MONGO_PASS,
      database: env.MONGO_DATABASE
    },
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development'
  };

  return {
    get: () => config
  };
};
