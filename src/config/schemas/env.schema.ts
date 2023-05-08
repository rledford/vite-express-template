import { z } from 'zod';
import { EnvModeSchema } from '../types';

export const EnvSchema = z.object({
  PORT: z.number().positive().max(65535).default(8000),
  NODE_ENV: EnvModeSchema,
  MONGO_HOST: z.string(),
  MONGO_PORT: z.coerce.number().positive().max(65535).default(27017),
  MONGO_USER: z.string(),
  MONGO_PASS: z.string(),
  MONGO_DATABASE: z.string()
});
