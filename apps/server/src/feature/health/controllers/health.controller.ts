import { Router } from 'express';
import { withResData } from '@/platform/utils';
import type { HealthService } from '../services';
import { Health } from '../models';

type Deps = {
  service: HealthService;
};

export const healthController = ({ service }: Deps): Router => {
  const router = Router();

  router.get(
    '/',
    withResData(Health)(async () => {
      return service.getHealth();
    }),
  );

  return router;
};
