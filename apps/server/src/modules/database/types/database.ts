import { Kysely } from 'kysely';
import { UserTable } from './user.table';

export interface DatabaseSchema {
  user: UserTable;
}

export type Database = Kysely<DatabaseSchema>;
