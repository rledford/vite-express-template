import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface UserCredentialTable {
  id: Generated<number>;
  hash: string;
  userId: number;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type UserCredential = Selectable<UserCredentialTable>;
export type NewUserCredential = Insertable<UserCredentialTable>;
export type UserCredentialUpdate = Updateable<UserCredentialTable>;
