import { z } from 'zod';

export type UserClaims = z.infer<typeof UserClaimsSchema>;
export const UserClaimsSchema = z.object({
  id: z.number().int(),
  username: z.string().nonempty(),
});

export type UserCredentials = z.infer<typeof UserCredentialsSchema>;
export const UserCredentialsSchema = z.object({
  username: z.string().nonempty(),
  hash: z.string().nonempty(),
});

export type BasicCredential = z.infer<typeof BasicCredentialSchema>;
export const BasicCredentialSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export const UserRegistrationSchema = BasicCredentialSchema;

export type JWT = z.infer<typeof JWTSchema>;
export const JWTSchema = z.string().nonempty();

export const TokenPayloadSchema = z.object({
  token: z.string().nonempty(),
});

export type SignClaimsFn = z.infer<typeof SignClaimsFn>;
export const SignClaimsFn = z
  .function()
  .args(UserClaimsSchema)
  .returns(JWTSchema);

export type VerifyJWTFn = z.infer<typeof VerifyJWTFn>;
export const VerifyJWTFn = z
  .function()
  .args(JWTSchema)
  .returns(UserClaimsSchema);
