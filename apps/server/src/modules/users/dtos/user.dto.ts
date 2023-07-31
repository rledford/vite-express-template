import { z } from 'zod';

export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
export const CreateUserSchema = z.object({
  username: z.string().trim().min(3)
});

export type UserDTO = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});
