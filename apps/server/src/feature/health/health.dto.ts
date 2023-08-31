import { z } from 'zod';

export type HealthDTO = z.infer<typeof HealthDTO>;
export const HealthDTO = z.object({
  uptime: z.number(),
});
