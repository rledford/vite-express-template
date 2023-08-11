import { z } from 'zod';

export type NewUserDTO = z.infer<typeof NewUserDTO>;
export const NewUserDTO = z.object({
  username: z.string().trim().min(3),
  password: z.string().trim().min(8)
});
