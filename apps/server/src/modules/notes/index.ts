import { notesController } from './controllers/note.controller';
import { notesService } from './services';

export const notesModule = () => {
  const service = notesService();
  const controller = notesController({ service });

  return {
    controller
  };
};
