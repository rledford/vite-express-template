import { Logger } from '@/platform/logger';

export const loggerSpy = (): Logger => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn()
});
