import { z } from 'zod';

export type EnvMode = z.infer<typeof EnvModeSchema>;

export const EnvModeSchema = z.union([
  z.literal('test'),
  z.literal('development'),
  z.literal('production')
]);
