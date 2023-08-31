import { ColumnType, Insertable, Selectable, Updateable } from 'kysely';

export interface UserProfilesTable {
  id: string;
  username: ColumnType<string, string, string>;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type UserProfileEntity = Selectable<UserProfilesTable>;
export type NewUserProfileEntity = Insertable<UserProfilesTable>;
export type UserProfileEntityUpdate = Updateable<UserProfilesTable>;
