import { Kysely } from 'kysely';
import { UserTable } from './user.table';
import { UserCredentialTable } from './user-credential.table';

export interface DatabaseSchema {
  user: UserTable;
  user_credential: UserCredentialTable;
}

export type Database = Kysely<DatabaseSchema>;
