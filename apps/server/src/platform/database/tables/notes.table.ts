import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface NotesTable {
  id: Generated<string>;
  userId: string;
  content: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type NoteEntity = Selectable<NotesTable>;
export type NewNoteEntity = Insertable<NotesTable>;
export type NoteEntityUpdate = Updateable<NotesTable>;
