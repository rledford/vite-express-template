import { Router } from 'express';
import { withResData } from '@/utils';
import { getBasicCredentials } from './utils';
import { AuthService } from './auth.service';
import { Middleware } from '@/types';
import { BasicCredentials, TokenPayload, UserClaims } from './models';

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
    withResData(UserClaims)(async (req) => {
      return req.claims;
    })
  );

  router.post(
    '/login',
    withResData(TokenPayload)(async (req) => {
      const token = await service.authenticate(getBasicCredentials(req));

      return { token };
    })
  );

  router.post(
    '/register',
    withResData(TokenPayload)(async (req) => {
      const token = await service.register(BasicCredentials.parse(req.body));

      return { token };
    })
  );

  return router;
};
