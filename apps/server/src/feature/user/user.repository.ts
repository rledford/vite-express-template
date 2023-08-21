import { DatabaseConnection } from '@/platform/database';
import { NewUser, User } from '@/platform/database/tables';

type Deps = {
  db: DatabaseConnection;
};

export interface UserRepository {
  insert: (registration: NewUser) => Promise<User | undefined>;
  find: () => Promise<Array<User>>;
  findById: (id: User['id']) => Promise<User | undefined>;
  findByCredentials: (
    credentials: Pick<User, 'username' | 'hash'>,
  ) => Promise<User | undefined>;
  count: () => Promise<number>;
}

export const userRepository = ({ db }: Deps): UserRepository => {
  return {
    insert: async (newUser) => {
      return db
        .insertInto('user')
        .values(newUser)
        .returningAll()
        .executeTakeFirst();
    },
    find: () => {
      return db.selectFrom('user').selectAll().execute();
    },
    findById: (id) => {
      return db
        .selectFrom('user')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
    },
    findByCredentials: async ({ username, hash }) => {
      return db
        .selectFrom('user')
        .selectAll()
        .where('username', '=', username)
        .where('hash', '=', hash)
        .executeTakeFirst();
    },
    count: async () => {
      const count = await db
        .selectFrom('user')
        .select((eb) => eb.fn.count('id').as('num_users'))
        .executeTakeFirst();
      return Number(count?.num_users || 0);
    },
  };
};
