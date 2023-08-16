import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface UserTable {
  id: Generated<number>;
  username: string;
  hash: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
