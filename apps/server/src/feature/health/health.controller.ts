import { Router } from 'express';
import { respondJSON } from '@/platform/utils';
import { HealthService } from './health.service';
import { HealthDTO } from './health.dto';

type Deps = {
  service: HealthService;
};

export type HealthController = Router;

export const healthController = ({ service }: Deps): Router => {
  const router = Router();
  const endpoints = Router();

  router.use('/health', endpoints);

  router.get('/', respondJSON(HealthDTO)(service.getHealth));

  return router;
};
