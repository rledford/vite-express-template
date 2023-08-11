import { Router } from 'express';
import { withResData } from '@/utils';
import { UserService } from './user.service';
import { UserDTO } from './dtos';

type Deps = {
  service: UserService;
};

export type userController = Router;

export const userController = ({ service }: Deps): Router => {
  const router = Router();

  router.get(
    '/',
    // TODO: protect endpoint
    withResData(async () => {
      return (await service.getAll()).map((user) => UserDTO.parse(user));
    })
  );

  router.get(
    '/:id',
    // TODO: protect endpoint
    withResData(async (req) => {
      return service.getOneById(Number(req.params.id));
    })
  );

  return router;
};
