import { DatabaseConnection } from '@/platform/database';
import { NewNote, Note } from '@/platform/database/tables';

export interface NoteRepository {
  insert: (newNote: NewNote) => Promise<Note>;
  findByUserId: (userId: number) => Promise<Note[]>;
  update: () => void;
  delete: () => void;
}

export type Deps = {
  db: DatabaseConnection;
};

export const noteRepository = ({ db }: Deps): NoteRepository => {
  return {
    insert: async (newNote) => {
      const note = await db
        .insertInto('note')
        .values(newNote)
        .returningAll()
        .executeTakeFirst();

      if (!note) throw new Error('Failed to create note');

      return note;
    },
    findByUserId: (userId) => {
      return db
        .selectFrom('note')
        .selectAll()
        .where('userId', '=', userId)
        .execute();
    },
    update: () => undefined,
    delete: () => undefined
  };
};
