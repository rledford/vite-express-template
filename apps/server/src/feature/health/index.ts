import { Router } from 'express';
import { HealthService, healthService } from './health.service';
import { healthController } from './health.controller';

interface HealthModule {
  service: HealthService;
  controller: Router;
}

export const healthModule = (): HealthModule => {
  const service = healthService();
  const controller = healthController({ service });

  return {
    service,
    controller,
  };
};
