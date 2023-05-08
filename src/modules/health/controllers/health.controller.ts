import { Router } from 'express';
import type { HealthService } from '../services';

type Deps = {
  service: HealthService;
};

export const healthController = ({ service }: Deps): Router => {
  const router = Router();

  router.get('/', async (req, res) => {
    const result = await service.getHealth();
    res.status(200).json(result);
  });

  return router;
};
