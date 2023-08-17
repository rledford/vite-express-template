import { User } from '@/platform/database/tables';
import { NotFoundError } from '@/platform/error';
import { UserRepository } from './user.repository';

type Deps = {
  repository: UserRepository;
};

export interface UserService {
  getAll: () => Promise<Array<User>>;
  getOneById: (id: User['id']) => Promise<User>;
}

export const userService = ({ repository }: Deps): UserService => {
  return {
    getAll: () => repository.find(),
    getOneById: async (id) => {
      const user = await repository.findById(id);

      if (!user) throw new NotFoundError();

      return user;
    }
  };
};