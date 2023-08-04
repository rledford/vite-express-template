import { Router } from 'express';
import { withResData } from '@/utils';
import type { Middleware } from '@/types';
import { UsersService } from '@/modules/users/services';

type Deps = {
  strategies: {
    jwtStrategy: Middleware;
    basicStrategy: Middleware;
  };
  usersService: UsersService;
};

export const authController = ({ strategies }: Deps) => {
  const router = Router();

  router.get(
    '/me',
    strategies.jwtStrategy,
    withResData(async (req) => {
      return req.user;
    })
  );

  router.post(
    '/login',
    strategies.basicStrategy,
    withResData(async () => {
      // TODO: return data with token and UserDTO
      return {};
    })
  );

  router.post(
    '/register',
    withResData(async () => {
      // TODO: implement
      return {};
    })
  );

  return router;
};
