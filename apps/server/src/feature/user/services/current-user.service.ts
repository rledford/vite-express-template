import { InternalError, UnauthorizedError } from '@/platform/error';
import { BasicCredentials, JWT, JWTSigner } from '@/platform/auth';
import { User } from '@/platform/database/tables';
import { UserRepository } from '../user.repository';
import { PublicUserSchema, UserRegistration } from '../user.schema';

export interface CurrentUserService {
  login: (basic: BasicCredentials) => Promise<JWT>;
  register: (registration: UserRegistration) => Promise<JWT>;
  profile: (id: number) => Promise<User | undefined>;
}

type Deps = {
  repository: UserRepository;
  sign: JWTSigner;
};

export const currentUserService = ({
  repository,
  sign,
}: Deps): CurrentUserService => {
  return {
    login: async ({ username, password }) => {
      // TODO: Use hash/salt
      const hash = password;

      const user = await repository.findByCredentials({ username, hash });

      if (!user) throw new UnauthorizedError();

      return sign(PublicUserSchema.parse(user));
    },
    register: async ({ username, password }) => {
      // TODO: Use hash/salt
      const hash = password;

      const user = await repository.insert({ username, hash });

      if (!user) throw new InternalError('Failed to register new user');

      return sign(PublicUserSchema.parse(user));
    },
    profile: async (id) => {
      return repository.findById(id);
    },
  };
};
