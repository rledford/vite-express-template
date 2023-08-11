import { z } from 'zod';

export type UserDTO = z.infer<typeof UserDTO>;
export const UserDTO = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
});
