import { z } from 'zod';

export const Health = z.object({
  uptime: z.number()
});
