import { DatabaseConnection } from '@/platform/database';
import {
  UserCredentialEntity,
  UserProfileEntity,
  UserProfileEntityUpdate,
} from '@/platform/database/tables';
import { UserLoginDTO, UserRegistrationDTO } from './user.dto';
import { InternalError } from '@/platform/error';

type Deps = {
  db: DatabaseConnection;
};

export interface UserRepository {
  register: (
    registration: UserRegistrationDTO,
  ) => Promise<Pick<UserCredentialEntity, 'userId'> | undefined>;
  findByCredential: (
    login: UserLoginDTO,
  ) => Promise<Pick<UserCredentialEntity, 'userId'> | undefined>;
  updateProfile: (params: {
    id: string;
    updates: UserProfileEntityUpdate;
  }) => Promise<UserProfileEntity | undefined>;
  findProfiles: () => Promise<Array<UserProfileEntity>>;
  findProfileById: (
    id: UserProfileEntity['id'],
  ) => Promise<UserProfileEntity | undefined>;
  countProfiles: () => Promise<number>;
}

export const userRepository = ({ db }: Deps): UserRepository => {
  return {
    register: async ({ credentials, profile }) => {
      return db.transaction().execute(async (trx) => {
        const userCredential = await trx
          .insertInto('user_credentials')
          .values(credentials)
          .returning('userId')
          .executeTakeFirst();

        if (!userCredential)
          throw new InternalError('Failed to create new user credential');

        await trx
          .insertInto('user_profiles')
          .values({ ...profile, id: userCredential.userId })
          .execute();

        return userCredential;
      });
    },
    findByCredential: async ({ email, password }) => {
      return db
        .selectFrom('user_credentials')
        .select(['id', 'userId'])
        .where('email', '=', email)
        .where('password', '=', password)
        .executeTakeFirst();
    },
    updateProfile: async ({ id, updates }) => {
      return db
        .updateTable('user_profiles')
        .set(updates)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    },
    findProfiles: () => {
      return db.selectFrom('user_profiles').selectAll().execute();
    },
    findProfileById: (id) => {
      return db
        .selectFrom('user_profiles')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
    },
    countProfiles: async () => {
      const count = await db
        .selectFrom('user_profiles')
        .select((eb) => eb.fn.count('id').as('numUsers'))
        .executeTakeFirst();
      return Number(count?.numUsers || 0);
    },
  };
};
