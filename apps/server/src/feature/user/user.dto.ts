import { z } from 'zod';

export const IdSchema = z.string().uuid();
export const UsernameSchema = z.string().nonempty();

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;
export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export type CreateUserProfileDTO = z.infer<typeof CreateUserProfileSchema>;
export const CreateUserProfileSchema = z.object({
  username: UsernameSchema,
});

export type CreateUserCredentialDTO = z.infer<
  typeof CreateUserCredentialSchema
>;
export const CreateUserCredentialSchema = z.object({}).merge(UserLoginSchema);

export type UserRegistrationDTO = z.infer<typeof UserRegistrationSchema>;
export const UserRegistrationSchema = z.object({
  credentials: CreateUserCredentialSchema,
  profile: CreateUserProfileSchema,
});

export type UserProfileDTO = z.infer<typeof PublicUserShchema>;
export const PublicUserShchema = z
  .object({
    id: z.string().uuid(),
  })
  .merge(CreateUserProfileSchema);

export type UpdateUserProfileDTO = z.infer<typeof UpdateUserProfileSchema>;
export const UpdateUserProfileSchema = z.object({
  username: z.string().nonempty(),
});

export type TokenPayloadDTO = z.infer<typeof TokenPayloadSchema>;
export const TokenPayloadSchema = z.object({
  token: z.string().nonempty(),
});

export type UserClaimsDTO = z.infer<typeof UserClaimsSchema>;
export const UserClaimsSchema = z.object({
  sub: IdSchema,
});
