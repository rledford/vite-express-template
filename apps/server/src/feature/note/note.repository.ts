import { DatabaseConnection } from '@/platform/database';
import { NewNoteEntity, NoteEntity } from '@/platform/database/tables';

export interface NoteRepository {
  insert: (newNote: NewNoteEntity) => Promise<NoteEntity>;
  findByUserId: (userId: string) => Promise<NoteEntity[]>;
  findOneByUserId: (params: {
    userId: string;
    id: string;
  }) => Promise<NoteEntity | undefined>;
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
        .insertInto('notes')
        .values(newNote)
        .returningAll()
        .executeTakeFirst();

      if (!note) throw new Error('Failed to create note');

      return note;
    },
    findByUserId: (userId) => {
      return db
        .selectFrom('notes')
        .selectAll()
        .where('userId', '=', userId)
        .execute();
    },
    findOneByUserId: ({ userId, id }) => {
      return db
        .selectFrom('notes')
        .selectAll()
        .where('userId', '=', userId)
        .where('id', '=', id)
        .executeTakeFirst();
    },
    update: () => undefined,
    delete: () => undefined,
  };
};
