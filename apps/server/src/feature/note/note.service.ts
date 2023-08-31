import { NoteEntity } from '@/platform/database/tables';
import { NoteRepository } from './note.repository';
import type { CreateNoteDTO } from './note.dto';

export interface NoteService {
  create: (dto: CreateNoteDTO) => Promise<NoteEntity | undefined>;
  getAllByUserId: (userId: string) => Promise<NoteEntity[]>;
  getOneByUserId: (params: {
    userId: string;
    id: string;
  }) => Promise<NoteEntity | undefined>;
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
    getOneByUserId: (params) => repository.findOneByUserId(params),
    update: async () => undefined,
  };
};
