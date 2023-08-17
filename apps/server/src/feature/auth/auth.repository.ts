import { DatabaseConnection } from '@/platform/database';
import { User } from '@/platform/database/tables';
import type { UserCredentials } from './models';

type Deps = {
  db: DatabaseConnection;
};

export interface AuthRepository {
  insert: (credentials: UserCredentials) => Promise<User | undefined>;
  findByCredentials: (
    userCredentials: UserCredentials
  ) => Promise<User | undefined>;
}

export const authRepository = ({ db }: Deps): AuthRepository => {
  return {
    insert: async (credentials) => {
      return db
        .insertInto('user')
        .values(credentials)
        .returningAll()
        .executeTakeFirst();
    },
    findByCredentials: async ({ username, hash }) => {
      return db
        .selectFrom('user')
        .selectAll()
        .where('user.username', '=', username)
        .where('user.hash', '=', hash)
        .executeTakeFirst();
    }
  };
};
