import { z } from 'zod';

export type UserClaims = z.infer<typeof UserClaims>;
export const UserClaims = z.object({
  id: z.number().int(),
  username: z.string().nonempty()
});

export type UserCredentials = z.infer<typeof UserCredentials>;
export const UserCredentials = z.object({
  username: z.string().nonempty(),
  hash: z.string().nonempty()
});

export type BasicCredentials = z.infer<typeof BasicCredentials>;
export const BasicCredentials = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty()
});

export type JWT = z.infer<typeof JWT>;
export const JWT = z.string().nonempty();

export const TokenPayload = z.object({
  token: z.string().nonempty()
});

export type SignClaimsFn = z.infer<typeof SignClaimsFn>;
export const SignClaimsFn = z.function().args(UserClaims).returns(JWT);

export type VerifyJWTFn = z.infer<typeof VerifyJWTFn>;
export const VerifyJWTFn = z.function().args(JWT).returns(UserClaims);
