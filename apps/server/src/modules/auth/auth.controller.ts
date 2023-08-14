import { Router } from 'express';
import { withResData } from '@/utils';
import { getBasicCredentials } from './utils';
import { AuthService } from './auth.service';
import { Middleware } from '@/types';
import {
  TokenPayloadSchema,
  UserClaimSchema,
  UserRegistrationSchema
} from './models';
import { validateMiddleware } from '@/middlewares';

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
    withResData(UserClaimSchema)(async (req) => {
      return req.claims;
    })
  );

  router.post(
    '/login',
    withResData(TokenPayloadSchema)(async (req) => {
      const token = await service.authenticate(getBasicCredentials(req));

      return { token };
    })
  );

  router.post(
    '/register',
    validateMiddleware(UserRegistrationSchema),
    withResData(TokenPayloadSchema)(async (req) => {
      const token = await service.register(req.body);

      return { token };
    })
  );

  return router;
};
