import { z } from 'zod';

export type PublicUser = z.infer<typeof PublicUser>;
export const PublicUser = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});
