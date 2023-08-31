import { DatabaseConnection } from '@/platform/database';
import { Middleware } from '@/platform/types';
import { NoteController, noteController } from './note.controller';
import { noteRepository } from './note.repository';
import { noteService } from './note.service';

export interface NoteModule {
  controller: NoteController;
}

export type Deps = {
  db: DatabaseConnection;
  setClaimsContext: Middleware;
};

export const noteModule = ({ db, setClaimsContext }: Deps) => {
  const repository = noteRepository({ db });
  const service = noteService({ repository });
  const controller = noteController({ service, setClaimsContext });

  return {
    controller,
  };
};
