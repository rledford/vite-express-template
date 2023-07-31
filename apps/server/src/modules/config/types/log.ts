import { z } from 'zod';

export type LogLevel = z.infer<typeof LogLevelSchema>;
export const LogLevelSchema = z.union([
  z.literal('none'),
  z.literal('info'),
  z.literal('warn'),
  z.literal('error')
]);
