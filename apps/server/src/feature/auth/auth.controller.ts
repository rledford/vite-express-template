import { Router } from 'express';
import { Middleware } from '@/platform/middleware/types';
import { withResData } from '@/platform/utils';
import { getBasicCredentials } from './utils';
import { AuthService } from './auth.service';
import {
  TokenPayloadSchema,
  UserClaimsSchema,
  UserRegistrationSchema,
} from './models';
import { validateMiddleware } from '@/platform/middleware';

type Deps = {
  service: AuthService;
  jwt: Middleware;
};

export type AuthController = Router;

export const authController = ({ service, jwt }: Deps) => {
  const router = Router();

  router.get(
    '/me',
    jwt,
    withResData(UserClaimsSchema)(async (req) => {
      return req.claims;
    }),
  );

  router.post(
    '/login',
    withResData(TokenPayloadSchema)(async (req) => {
      const token = await service.authenticate(getBasicCredentials(req));

      return { token };
    }),
  );

  router.post(
    '/register',
    validateMiddleware(UserRegistrationSchema),
    withResData(TokenPayloadSchema)(async (req) => {
      const token = await service.register(req.body);

      return { token };
    }),
  );

  return router;
};
