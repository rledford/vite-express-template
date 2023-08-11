import { jsonObjectFrom } from 'kysely/helpers/postgres';
import { Database, User } from '../database/types';
import { BasicCredentials, UserWithCredential } from './types';
import { InternalError } from '@/errors';

type Deps = {
  db: Database;
};

export interface AuthRepository {
  findUserWithCredential: (
    username: string
  ) => Promise<UserWithCredential | null>;
  // change to UserRegistration type
  insertUserWithCredential: (credentials: BasicCredentials) => Promise<User>;
}

export const authRepository = ({ db }: Deps): AuthRepository => {
  return {
    // TODO: find by username AND hash
    findUserWithCredential: async (username) => {
      const user = await db
        .selectFrom('user')
        .where('username', '=', username)
        .selectAll('user')
        .select((eb) => [
          jsonObjectFrom(
            eb
              .selectFrom('user_credential')
              .selectAll('user_credential')
              .whereRef('user.id', '=', 'userId')
          ).as('credential')
        ])
        .executeTakeFirst();

      if (!user || !user.credential) return null;

      return user as UserWithCredential;
    },
    insertUserWithCredential: async ({ username, password }) => {
      const user = await db.transaction().execute(async (trx) => {
        const newUser = await trx
          .insertInto('user')
          .values({ username })
          .returningAll()
          .executeTakeFirst();

        if (!newUser)
          throw new InternalError(
            'Expected new user to be created and returned'
          );

        await trx
          .insertInto('user_credential')
          .values({ hash: password, userId: newUser.id })
          .execute();

        return newUser;
      });

      return user;
    }
  };
};
