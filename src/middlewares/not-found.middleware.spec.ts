import { NotFoundError } from '@/errors';
import { notFoundMiddleware } from './not-found.middleware';

describe('notFoundMiddleware', () => {
  const middleware = notFoundMiddleware();

  it('should return a middleware function', () => {
    expect(middleware).toEqual(expect.any(Function));
  });

  it('should throw not found error', () => {
    expect(() => middleware()).throws(NotFoundError);
  });
});
