import { Router } from 'express';
import { withResData } from '@/platform/utils';
import { HealthService } from './health.service';
import { HealthSchema } from './health.schema';

type Deps = {
  service: HealthService;
};

export const healthController = ({ service }: Deps): Router => {
  const router = Router();

  router.get('/', withResData(HealthSchema)(service.getHealth));

  return router;
};
