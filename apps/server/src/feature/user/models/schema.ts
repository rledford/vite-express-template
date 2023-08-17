import { z } from 'zod';

export type PublicUser = z.infer<typeof PublicUserSchema>;
export const PublicUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
