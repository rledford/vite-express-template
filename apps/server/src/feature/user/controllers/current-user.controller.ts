import { Router } from 'express';
import { TokenPayloadSchema } from '@/platform/auth';
import { withResData } from '@/platform/utils';
import { CurrentUserService } from '../services';
import { PublicUserSchema, UserRegistrationSchema } from '../user.schema';
import { Middleware } from '@/platform/types';

export type CurrentUserController = Router;

type Deps = {
  service: CurrentUserService;
  jwtGuard: Middleware;
  basicGuard: Middleware;
};

export const currentUserController = ({
  service,
  jwtGuard,
  basicGuard,
}: Deps): Router => {
  const router = Router();

  router.post(
    '/login',
    basicGuard,
    withResData(TokenPayloadSchema)(async (req) => {
      const token = await service.login(req.context.credentials);
      return { token };
    }),
  );

  router.post(
    '/register',
    withResData(TokenPayloadSchema)(async (req) => {
      const registration = await UserRegistrationSchema.parseAsync(req.body);
      const token = await service.register(registration);
      return { token };
    }),
  );

  router.get(
    '/profile',
    jwtGuard,
    withResData(PublicUserSchema)(async (req) =>
      service.profile(req.context.claims.id),
    ),
  );

  return router;
};
