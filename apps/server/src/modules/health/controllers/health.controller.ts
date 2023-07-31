import { Router } from 'express';
import { withResData } from '@/utils';
import type { HealthService } from '../services';

type Deps = {
  service: HealthService;
};

export const healthController = ({ service }: Deps): Router => {
  const router = Router();

  router.get(
    '/',
    withResData(async () => {
      return service.getHealth();
    })
  );

  return router;
};
