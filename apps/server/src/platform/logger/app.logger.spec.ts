import { createLogger } from 'vite';
import { noopLogger } from './app.logger';

const expectedLogger = expect.objectContaining({
  info: expect.any(Function),
  warn: expect.any(Function),
  error: expect.any(Function)
});

describe('logger', () => {
  describe('createLogger', () => {
    it('should return a logger', () => {
      expect(createLogger()).toMatchObject(expectedLogger);
    });
  });

  describe('noopLogger', () => {
    it('should return a no-op logger', () => {
      expect(noopLogger()).toMatchObject(expectedLogger);
    });
  });
});
