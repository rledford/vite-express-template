import { Knex } from 'knex';
import { z } from 'zod';

export type UserId = number;
export type User = z.infer<typeof UserModelSchema>;
const UserModelSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const Users = (db: Knex) => {
  const table = () => db.table<User>('users');

  return {
    insert: async (user: Partial<User>) => {
      const [result] = await table().insert(user).returning('*');

      return result as User;
    },
    find: () => {
      return table();
    },
    findById: async (id: UserId) => {
      const [user] = await table().where('id', id);

      return user as User;
    }
  };
};
