import { DatabaseConnection } from '@/platform/database';
import { Middleware } from '@/platform/middleware/types';
import { NoteController, noteController } from './note.controller';
import { noteRepository } from './note.repository';
import { noteService } from './note.service';

export interface NoteModule {
  controller: NoteController;
}

export type Deps = {
  db: DatabaseConnection;
  jwt: Middleware;
};

export const noteModule = ({ db, jwt }: Deps) => {
  const repository = noteRepository({ db });
  const service = noteService({ repository });
  const controller = noteController({ service, jwt });

  return {
    controller
  };
};