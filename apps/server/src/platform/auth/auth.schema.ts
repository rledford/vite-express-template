import { z } from 'zod';

export type JWT = z.infer<typeof JWTSchema>;
export const JWTSchema = z.string().nonempty();

export type TokenClaims = z.infer<typeof TokenClaimsSchema>;
export const TokenClaimsSchema = z.object({
  id: z.number().int(),
  username: z.string().nonempty(),
});

export type BasicCredentials = z.infer<typeof BasicCredentialsSchema>;
export const BasicCredentialsSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;
export const TokenPayloadSchema = z.object({
  token: z.string().nonempty(),
});
