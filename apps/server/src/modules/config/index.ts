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
    jwtSecret: env.JWT_SECRET,
    db: {
      database: env.DB_DATABASE,
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASS,
      min: env.DB_MIN_POOL_SIZE,
      max: env.DB_MAX_POOL_SIZE
    },
    isProd: env.NODE_ENV === 'production',
    isDev: env.NODE_ENV === 'development'
  };

  return {
    get: () => config
  };
};
