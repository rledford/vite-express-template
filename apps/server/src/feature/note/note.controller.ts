import { Router } from 'express';
import { Middleware } from '@/platform/types';
import { withResData } from '@/platform/utils';
import { NoteService } from './note.service';
import { CreateNoteSchema, NoteSchema } from './note.schema';

export type NoteController = Router;

type Deps = {
  service: NoteService;
  jwtGuard: Middleware;
};

export const noteController = ({ service, jwtGuard }: Deps): NoteController => {
  const router = Router();

  // TODO: implement remaining routes

  router.post(
    '/',
    jwtGuard,
    withResData(NoteSchema)(({ context, body }) =>
      service.create(
        CreateNoteSchema.parse({ userId: context.claims.id, ...body }),
      ),
    ),
  );

  router.get(
    '/',
    jwtGuard,
    withResData(NoteSchema)(async ({ context }) =>
      // TODO: switch to using Context class with getters that throw when accessing an undefined property
      service.getAllByUserId(context.claims.id as number),
    ),
  );

  return router;
};
