import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from 'kysely';

export interface NoteTable {
  id: Generated<number>;
  userId: number;
  content: string;
  createdAt: ColumnType<Date, string | undefined, never>;
  updateAt: ColumnType<Date, string | undefined, never>;
}

export type Note = Selectable<NoteTable>;
export type NewNote = Insertable<NoteTable>;
export type NoteUpdate = Updateable<NoteTable>;
