import { createLogger } from 'vite';
import { noopLogger } from './logger';

describe('logger', () => {
  describe('createLogger', () => {
    it('should return a logger', () => {
      const logger = createLogger();

      expect(logger.info).toEqual(expect.any(Function));
      expect(logger.warn).toEqual(expect.any(Function));
      expect(logger.error).toEqual(expect.any(Function));
    });
  });

  describe('noopLogger', () => {
    it('should return a no-op logger', () => {
      const logger = noopLogger();

      expect(logger.info).toEqual(expect.any(Function));
      expect(logger.warn).toEqual(expect.any(Function));
      expect(logger.error).toEqual(expect.any(Function));
    });
  });
});
