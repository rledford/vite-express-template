import { Kysely } from 'kysely';
import { UserTable } from './user.table';
import { NoteTable } from './note.table';

export interface DatabaseSchema {
  user: UserTable;
  note: NoteTable;
}

export type Database = Kysely<DatabaseSchema>;
