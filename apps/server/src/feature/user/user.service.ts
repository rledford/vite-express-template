import { UserProfileEntity } from '@/platform/database/tables';
import { UserRepository } from './user.repository';
import type { UpdateUserProfileDTO, UserRegistrationDTO } from './user.dto';
import { ClaimsSchema, BasicAuth, JWT, JWTSigner } from '@/platform/auth';
import { InternalError, UnauthorizedError } from '@/platform/error';

export interface UserService {
  updateProfile: (params: {
    id: string;
    updates: UpdateUserProfileDTO;
  }) => Promise<UserProfileEntity | undefined>;
  findManyProfiles: () => Promise<UserProfileEntity[]>;
  findProfileById: (id: string) => Promise<UserProfileEntity | undefined>;
  login: (auth: BasicAuth) => Promise<JWT>;
  register: (registration: UserRegistrationDTO) => Promise<JWT>;
}

type Deps = {
  repository: UserRepository;
  sign: JWTSigner;
};

export const userService = ({ repository, sign }: Deps): UserService => {
  return {
    updateProfile: async ({ id, updates }) =>
      repository.updateProfile({ id, updates }),
    findManyProfiles: async () => repository.findProfiles(),
    findProfileById: async (id) => repository.findProfileById(id),
    login: async ({ email, password }) => {
      // TODO: Use hash/salt
      const hash = password;
      const claims = await repository.findByCredential({
        email,
        password: hash,
      });

      if (!claims) throw new UnauthorizedError();

      return sign(ClaimsSchema.parse({ sub: claims.userId }));
    },
    register: async ({ credentials: { email, password }, profile }) => {
      // TODO: Use hash/salt
      const hash = password;
      const claims = await repository.register({
        credentials: {
          email,
          password: hash,
        },
        profile,
      });

      if (!claims) throw new InternalError('Failed to register new user');

      return sign(ClaimsSchema.parse({ sub: claims.userId }));
    },
  };
};
