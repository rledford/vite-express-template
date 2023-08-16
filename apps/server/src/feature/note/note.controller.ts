import { Router } from 'express';
import { NoteService } from './note.service';
import { withResData } from '@/utils';
import {
  CreateNoteSchema,
  CreateNoteWithUserSchema,
  NoteSchema
} from './note.schema';
import { Middleware } from '@/types';
import { validateMiddleware } from '@/middleware';

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
    validateMiddleware(CreateNoteSchema),
    withResData(NoteSchema)((req) => {
      return service.create(
        CreateNoteWithUserSchema.parse({ userId: req.claims?.id, ...req.body })
      );
    })
  );

  router.get(
    '/',
    jwt,
    withResData(NoteSchema)(async (req) =>
      // TODO: switch to using Context class with getters that throw when accessing an undefined property
      service.getAllByUserId(req.claims?.id as number)
    )
  );

  return router;
};
