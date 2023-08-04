import { UserSchema } from '@/modules/users/dtos';
import { z } from 'zod';

export type AuthToken = string;
export type TokenClaims = z.infer<typeof TokenClaimsSchema>;
export const TokenClaimsSchema = z.object({
  user: UserSchema
});

export type BasicCredentials = z.infer<typeof BasicCredentialsSchema>;
export const BasicCredentialsSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty()
});
