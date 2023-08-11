import { Database, UserCredential } from '@/modules/database/types';
import { User } from '../database/types/user.table';
import { NewUserDTO } from './dtos';
import { InternalError } from '@/errors';
import { VerifyUserArgs } from '@/types';

type Deps = {
  db: Database;
};

export interface UserRepository {
  save: (newUser: NewUserDTO) => Promise<User>;
  find: () => Promise<Array<User>>;
  findById: (id: User['id']) => Promise<User | undefined>;
  findByUsername: (username: User['username']) => Promise<User | undefined>;
  findCredential: (
    username: User['username']
  ) => Promise<UserCredential | undefined>;
  count: () => Promise<number>;
}

export const userRepository = ({ db }: Deps): UserRepository => {
  return {
    save: async (data) => {
      const { password, ...newUser } = data;

      const user = await db.transaction().execute(async (trx) => {
        const user = await trx
          .insertInto('user')
          .values(newUser)
          .returningAll()
          .executeTakeFirst();

        if (!user)
          throw new InternalError(
            'Expected new user to be created and returned'
          );

        await trx
          .insertInto('user_credential')
          .values({ hash: password, userId: user.id })
          .execute();

        return user;
      });

      return user as User;
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
    findByUsername: (username) => {
      return db
        .selectFrom('user')
        .selectAll()
        .where('username', '=', username)
        .executeTakeFirst();
    },
    findCredential: async (username) => {
      return db
        .selectFrom('user_credential')
        .selectAll(['user_credential']) // only select columns in credential table
        .innerJoin('user', 'user.id', 'user_credential.userId')
        .where('user.username', '=', username)
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
