import { Router } from 'express';
import { validateWithCurrentUser } from '@/platform/middleware';
import { Middleware } from '@/platform/middleware/types';
import { withResData } from '@/platform/utils';
import { NoteService } from './note.service';
import { CreateNoteSchema, NoteSchema } from './note.schema';

export type NoteController = Router;

type Deps = {
  service: NoteService;
  jwt: Middleware;
};

export const noteController = ({ service, jwt }: Deps): NoteController => {
  const router = Router();

  // TODO: implement remaining routes

  router.post(
    '/',
    jwt,
    validateWithCurrentUser(CreateNoteSchema),
    withResData(NoteSchema)((req) => service.create(req.body)),
  );

  router.get(
    '/',
    jwt,
    withResData(NoteSchema)(async (req) =>
      // TODO: switch to using Context class with getters that throw when accessing an undefined property
      service.getAllByUserId(req.claims?.id as number),
    ),
  );

  return router;
};
