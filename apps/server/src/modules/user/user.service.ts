import { NotFoundError } from '@/errors';
import { User } from '../database/types/user.table';
import { UserRepository } from './user.repository';
import { NewUserDTO } from './dtos';
import { VerifyUserCallback } from '@/types';

type Deps = {
  repository: UserRepository;
};

export interface UserService {
  create: (newUser: NewUserDTO) => Promise<User>;
  getAll: () => Promise<Array<User>>;
  getOneById: (id: User['id']) => Promise<User>;
  getOneByUsername: (username: User['username']) => Promise<User>;
  verifyUser: VerifyUserCallback;
}

export const userService = ({ repository }: Deps): UserService => {
  return {
    create: async (dto) => {
      return repository.save(dto);
    },
    getAll: () => repository.find(),
    getOneById: async (id) => {
      const user = await repository.findById(id);

      if (!user) throw new NotFoundError();

      return user;
    },
    getOneByUsername: async (username) => {
      const user = await repository.findByUsername(username);

      if (!user) throw new NotFoundError();

      return user;
    },
    verifyUser: async ({ username, password }) => {
      const credential = await repository.findCredential(username);

      // TODO: hash the password before comparing
      const hash = password;

      return credential?.hash === hash;
    }
  };
};
