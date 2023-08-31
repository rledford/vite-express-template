import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface UserCredentialsTable {
  id: Generated<string>;
  userId: ColumnType<string, never, string>;
  email: string;
  password: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type UserCredentialEntity = Selectable<UserCredentialsTable>;
export type NewUserCredentialEntity = Insertable<UserCredentialsTable>;
export type UserCredentialEntityUpdate = Updateable<UserCredentialsTable>;
