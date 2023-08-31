import { z } from 'zod';

export type JWT = z.infer<typeof JWTSchema>;
export const JWTSchema = z.string().nonempty();

export type Claims = z.infer<typeof ClaimsSchema>;
export const ClaimsSchema = z.object({
  sub: z.string().uuid(),
});

export type BasicAuth = z.infer<typeof BasicAuthSchema>;
export const BasicAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});
