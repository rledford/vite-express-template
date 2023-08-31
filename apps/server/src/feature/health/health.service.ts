import type { HealthDTO } from './health.dto';

export interface HealthService {
  getHealth: () => Promise<HealthDTO>;
}

export const healthService = (): HealthService => ({
  getHealth: async () => ({ uptime: process.uptime() }),
});
