import { Knex } from 'knex';
import { User, UserId, Users } from '../models';
import { CreateUserDTO, UserDTO } from '../dtos';

export interface UsersService {
  find: () => Promise<Array<User>>;
  findByUsername: (username: string) => Promise<User>;
  findById: (id: UserId) => Promise<User>;
  create: (dto: CreateUserDTO) => Promise<User>;
}

type Deps = {
  db: Knex;
};

export const usersService = ({ db }: Deps): UsersService => {
  const users = Users(db);

  return {
    find: () => users.find(),
    findById: async (id) => users.findById(id),
    findByUsername: async (username) => users.findByUsername(username),
    create: async (dto) => {
      return users.insert(dto);
    }
  };
};
