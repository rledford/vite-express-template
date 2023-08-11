import { Router } from 'express';
import { withResData } from '@/utils';
import { getBasicCredentials } from './utils';
import { AuthService } from './auth.service';
import { BasicCredentialsSchema, TokenClaims } from './types';
import { Middleware } from '@/types';

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
    withResData(async (req) => {
      // TODO: change express.d.ts to use `claims` instead of `user`
      return req.user;
    })
  );

  router.post(
    '/login',
    withResData(async (req) => {
      const token = await service.authenticate(getBasicCredentials(req));

      // TODO: use DTO schema parse
      return { token };
    })
  );

  router.post(
    '/register',
    withResData(async (req) => {
      const user = await service.register(
        BasicCredentialsSchema.parse(req.body)
      );

      const token = service.sign(user as unknown as TokenClaims);

      // TODO: use DTO schema parse
      return { token };
    })
  );

  return router;
};
