import { Router } from 'express';
import { healthController } from './controllers';
import { HealthService, healthService } from './services';

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
