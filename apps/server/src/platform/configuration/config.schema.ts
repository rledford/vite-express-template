import { z } from 'zod';

const PortSchema = z.coerce.number().int().min(0).max(65535);
const ValidStringSchema = z.string().nonempty();
const ValidPoolSizeSchema = z.coerce.number().int().min(1);

export type LogLevel = z.infer<typeof LogLevelSchema>;
export const LogLevelSchema = z.union([
  z.literal('debug'),
  z.literal('info'),
  z.literal('warn'),
  z.literal('error'),
]);

export type EnvMode = z.infer<typeof EnvModeSchema>;
export const EnvModeSchema = z.union([
  z.literal('test'),
  z.literal('development'),
  z.literal('production'),
]);

export type AppConfig = z.infer<typeof AppConfigSchema>;
export const AppConfigSchema = z.object({
  logLevel: LogLevelSchema,
  mode: EnvModeSchema,
  port: PortSchema,
  jwtSecret: ValidStringSchema,
  isProd: z.boolean(),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;
export const DatabaseConfigSchema = z.object({
  database: ValidStringSchema,
  host: ValidStringSchema,
  port: PortSchema,
  user: ValidStringSchema,
  password: ValidStringSchema,
  min: ValidPoolSizeSchema,
  max: ValidPoolSizeSchema,
});

export type Env = z.infer<typeof EnvSchema>;
export const EnvSchema = z.object({
  LOG_LEVEL: LogLevelSchema.default('error'),
  NODE_ENV: EnvModeSchema.default('development'),
  PORT: PortSchema.default(8000),
  JWT_SECRET: ValidStringSchema,
  DB_HOST: ValidStringSchema.default('localhost'),
  DB_PORT: PortSchema.default(5432),
  DB_USER: ValidStringSchema,
  DB_PASS: ValidStringSchema,
  DB_DATABASE: ValidStringSchema,
  DB_MIN_POOL_SIZE: ValidPoolSizeSchema.default(2),
  DB_MAX_POOL_SIZE: ValidPoolSizeSchema.default(10),
});
