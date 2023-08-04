import { Router } from 'express';
import { UsersService } from '../services';
import { withResData } from '@/utils';
import { CreateUserSchema } from '../dtos';

type Deps = {
  service: UsersService;
};

export const usersController = ({ service }: Deps) => {
  const router = Router();

  router.post(
    '/',
    withResData(async (req) => {
      const dto = CreateUserSchema.parse(req.body);

      return service.create(dto);
    })
  );

  router.get(
    '/',
    withResData(async () => {
      return service.find();
    })
  );

  router.get(
    '/:id',
    withResData(async (req) => {
      return service.findById(Number(req.params.id));
    })
  );

  return router;
};
