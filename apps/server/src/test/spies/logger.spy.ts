import { Logger } from '@/types';

export const loggerSpy = (): Logger => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn()
});
