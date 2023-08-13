import { Database } from '@/modules/database/types';
import { User } from '../database/types/user.table';

type Deps = {
  db: Database;
};

export interface UserRepository {
  find: () => Promise<Array<User>>;
  findById: (id: User['id']) => Promise<User | undefined>;
  count: () => Promise<number>;
}

export const userRepository = ({ db }: Deps): UserRepository => {
  return {
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
    count: async () => {
      const count = await db
        .selectFrom('user')
        .select((eb) => eb.fn.count('id').as('num_users'))
        .executeTakeFirst();
      return Number(count?.num_users || 0);
    }
  };
};
