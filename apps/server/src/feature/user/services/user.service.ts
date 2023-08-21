import { User } from '@/platform/database/tables';
import { UserRepository } from '../user.repository';

export interface UserService {
  findMany: () => Promise<User[]>;
  findById: (id: number) => Promise<User | undefined>;
}

type Deps = {
  repository: UserRepository;
};

export const userService = ({ repository }: Deps): UserService => {
  return {
    findMany: async () => repository.find(),
    findById: async (id) => repository.findById(id),
  };
};
