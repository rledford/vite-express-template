import { healthController } from './controllers';
import { healthService } from './services';

export const healthModule = () => {
  const service = healthService();
  const controller = healthController({ service });

  return controller;
};
