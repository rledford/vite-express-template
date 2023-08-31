import { Router } from 'express';
import { respondJSON } from '@/platform/utils';
import { Middleware } from '@/platform/types';
import { UserService } from './user.service';
import {
  PublicUserShchema,
  TokenPayloadSchema,
  UpdateUserProfileSchema,
  UserRegistrationSchema,
} from './user.dto';
import { validateBody } from '@/platform/middleware';

export type UserController = Router;

type Deps = {
  service: UserService;
  setClaimsContext: Middleware;
  setAuthContext: Middleware;
};

export const userController = ({
  service,
  setClaimsContext,
  setAuthContext,
}: Deps): UserController => {
  const router = Router();
  const endpoints = Router();

  router.use('/users', endpoints);

  endpoints.post(
    '/register',
    validateBody(UserRegistrationSchema),
    respondJSON(TokenPayloadSchema)(async (req) => {
      const token = await service.register(req.body);
      return { token };
    }),
  );

  endpoints.post(
    '/login',
    setAuthContext,
    respondJSON(TokenPayloadSchema)(async (req) => {
      const token = await service.login(req.context.auth);
      return { token };
    }),
  );

  endpoints.patch(
    '/me',
    setClaimsContext,
    respondJSON(PublicUserShchema)(async ({ context, body }) => {
      const { sub } = context.claims;
      const updates = await UpdateUserProfileSchema.parseAsync({ ...body });
      return service.updateProfile({ id: sub, updates });
    }),
  );

  endpoints.get(
    '/me',
    setClaimsContext,
    respondJSON(PublicUserShchema)(({ context }) =>
      service.findProfileById(context.claims.sub),
    ),
  );

  endpoints.get('/', respondJSON(PublicUserShchema)(service.findManyProfiles));
  endpoints.get(
    '/:id',
    respondJSON(PublicUserShchema)((req) =>
      service.findProfileById(req.params.id),
    ),
  );

  return router;
};
