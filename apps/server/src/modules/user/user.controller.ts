import { Router } from 'express';
import { withResData } from '@/utils';
import { UserService } from './user.service';
import { Middleware } from '@/types';
import { PublicUserSchema } from './models';

type Deps = {
  service: UserService;
  jwt: Middleware;
};

export type userController = Router;

export const userController = ({ service, jwt }: Deps): Router => {
  const router = Router();

  router.use(jwt);

  router.get('/', withResData(PublicUserSchema)(service.getAll));

  router.get(
    '/:id',
    withResData(PublicUserSchema)(async (req) => {
      return service.getOneById(Number(req.params.id));
    })
  );

  return router;
};
