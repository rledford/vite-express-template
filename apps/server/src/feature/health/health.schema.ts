import { z } from 'zod';

export type Health = z.infer<typeof HealthSchema>;
export const HealthSchema = z.object({
  uptime: z.number(),
});
