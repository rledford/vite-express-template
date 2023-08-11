import { z } from 'zod';

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

const DatabaseConfigSchema = z.object({
  database: z.string().nonempty(),
  host: z.string().nonempty().default('localhost'),
  port: z.coerce.number().int().default(5432),
  user: z.string().nonempty(),
  password: z.string().nonempty(),
  /** min pool size */
  min: z.number(),
  /** max pool size */
  max: z.number()
});
