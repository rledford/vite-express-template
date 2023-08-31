import { Router } from 'express';
import { Middleware } from '@/platform/types';
import { respondJSON } from '@/platform/utils';
import { NoteService } from './note.service';
import { CreateNoteDTO, NoteDTO } from './note.dto';

export type NoteController = Router;

type Deps = {
  service: NoteService;
  setClaimsContext: Middleware;
};

export const noteController = ({
  service,
  setClaimsContext,
}: Deps): NoteController => {
  const router = Router();
  const endpoints = Router();

  router.use('/notes', endpoints);

  // TODO: implement remaining routes

  endpoints.post(
    '/',
    setClaimsContext,
    respondJSON(NoteDTO)(({ context, body }) =>
      service.create(
        CreateNoteDTO.parse({ userId: context.claims.sub, ...body }),
      ),
    ),
  );

  endpoints.get(
    '/',
    setClaimsContext,
    respondJSON(NoteDTO)(async ({ context }) =>
      // TODO: switch to using Context class with getters that throw when accessing an undefined property
      service.getAllByUserId(context.claims.sub),
    ),
  );

  endpoints.get(
    '/:id',
    setClaimsContext,
    respondJSON(NoteDTO)(async ({ context, params }) => {
      return service.getOneByUserId({
        userId: context.claims.sub,
        id: params.id,
      });
    }),
  );

  return router;
};
