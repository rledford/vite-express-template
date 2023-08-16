export interface HealthService {
  getHealth: () => Promise<{
    uptime: number;
  }>;
}

export const healthService = (): HealthService => ({
  getHealth: async () => ({ uptime: process.uptime() })
});
