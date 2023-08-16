import dotenv from 'dotenv';
import { DatabaseConfig, EnvSchema, AppConfig } from './config.schema';

export interface PlatformConfig {
  forApp: () => AppConfig;
  forDatabase: () => DatabaseConfig;
}

export const platformConfig = (path = '.env'): PlatformConfig => {
  const env = EnvSchema.parse(
    Object.assign({}, dotenv.config({ path }), process.env)
  );

  return {
    forApp: () => ({
      logLevel: env.LOG_LEVEL,
      mode: env.NODE_ENV,
      port: env.PORT,
      jwtSecret: env.JWT_SECRET,
      isProd: env.NODE_ENV === 'production'
    }),
    forDatabase: () => ({
      database: env.DB_DATABASE,
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASS,
      min: env.DB_MAX_POOL_SIZE,
      max: env.DB_MIN_POOL_SIZE
    })
  };
};
