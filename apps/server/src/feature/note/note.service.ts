import { Note } from '@/platform/database/tables';
import { NoteRepository } from './note.repository';
import { CreateNote } from './note.schema';

export interface NoteService {
  create: (dto: CreateNote) => Promise<Note | undefined>;
  getAllByUserId: (userId: number) => Promise<Note[]>;
  update: () => Promise<undefined>;
}

export type Deps = {
  repository: NoteRepository;
};

export const noteService = ({ repository }: Deps): NoteService => {
  // TODO: implement remaining services
  return {
    create: (dto) => {
      return repository.insert(dto);
    },
    getAllByUserId: (userId) => repository.findByUserId(userId),
    update: async () => undefined,
  };
};
