import { Router } from 'express';
import { withResData } from '@/platform/utils';
import { UserService } from '../services';
import { PublicUserSchema } from '../user.schema';
import { Middleware } from '@/platform/types';

export type UserController = Router;

type Deps = {
  service: UserService;
  jwtGuard: Middleware;
};

export const userController = ({ service, jwtGuard }: Deps): UserController => {
  const router = Router();

  router.use(jwtGuard);

  router.get('/', withResData(PublicUserSchema)(service.findMany));
  router.get(
    '/:id',
    withResData(PublicUserSchema)((req) =>
      service.findById(Number(req.params.id)),
    ),
  );

  return router;
};
