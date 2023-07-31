import { z } from 'zod';
import { DbTypeSchema } from './db';
import { LogLevelSchema } from './log';

export type EnvMode = z.infer<typeof EnvModeSchema>;
export const EnvModeSchema = z.union([
  z.literal('test'),
  z.literal('development'),
  z.literal('staging'),
  z.literal('production')
]);

export const EnvSchema = z.object({
  LOG_LEVEL: LogLevelSchema.default('error'),
  NODE_ENV: EnvModeSchema.default('development'),
  PORT: z.coerce.number().positive().max(65535).default(8000),
  DB_TYPE: DbTypeSchema.default('postgres'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().positive().max(65535).default(5432),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_DATABASE: z.string()
});
