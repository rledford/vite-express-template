import { z } from 'zod';
import { UserDTO } from '@/modules/user/dtos';
import { User, UserCredential } from '@/modules/database/types';

export type UserWithCredential = User & { credential: UserCredential };
export type AuthToken = string;
export type TokenClaims = z.infer<typeof TokenClaimsSchema>;
// TODO: Use separate claims DTO
export const TokenClaimsSchema = UserDTO;

export type BasicCredentials = z.infer<typeof BasicCredentialsSchema>;
export const BasicCredentialsSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty()
});
