import { HealthService, healthService } from './health.service';
import { HealthController, healthController } from './health.controller';

interface HealthModule {
  service: HealthService;
  controller: HealthController;
}

export const healthModule = (): HealthModule => {
  const service = healthService();
  const controller = healthController({ service });

  return {
    service,
    controller,
  };
};
