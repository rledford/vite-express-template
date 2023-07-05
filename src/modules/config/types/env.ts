import { z } from 'zod';
import { MongoTypeSchema } from './db';
import { LogLevelSchema } from './log';

export type EnvMode = z.infer<typeof EnvModeSchema>;
export const EnvModeSchema = z.union([
  z.literal('test'),
  z.literal('development'),
  z.literal('production')
]);

export const EnvSchema = z.object({
  LOG_LEVEL: LogLevelSchema.default('error'),
  NODE_ENV: EnvModeSchema.default('development'),
  PORT: z.coerce.number().positive().max(65535).default(8000),
  MONGO_TYPE: MongoTypeSchema.default('mongo'),
  MONGO_HOST: z.string().default('localhost'),
  MONGO_PORT: z.coerce.number().positive().max(65535).default(27017),
  MONGO_USER: z.string(),
  MONGO_PASS: z.string(),
  MONGO_DATABASE: z.string()
});
