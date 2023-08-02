import { Router } from 'express';
import { NotesService } from '../services';

type Deps = {
  service: NotesService;
};

export const notesController = ({ service }: Deps) => {
  const router = Router();

  // TODO: implement remaining routes

  router.post('/', (req, res) => {
    service.create();

    res.status(200).end();
  });

  return router;
};
