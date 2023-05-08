import dotenv from 'dotenv';
import { Configuration } from './interfaces';
import { EnvSchema } from './schemas';

const env = EnvSchema.parse(dotenv.config().parsed || process.env);

export const config: Configuration = {
  mode: env.NODE_ENV,
  port: env.PORT,
  mongoUri: `mongodb+srv://${env.MONGO_USER}:${env.MONGO_PASS}@${env.MONGO_HOST}/${env.MONGO_DATABASE}`,
  isProd: env.NODE_ENV === 'production',
  isDev: env.NODE_ENV === 'development'
};
