import { NotFoundError } from '@/platform/error';
import { notFoundMiddleware } from './not-found.middleware';
import { expressSpy } from '@/test/spies';

describe('notFoundMiddleware', () => {
  const middleware = notFoundMiddleware();

  it('should return a middleware function', () => {
    expect(middleware).toEqual(expect.any(Function));
  });

  it('should throw not found error', () => {
    const { req, res, next } = expressSpy();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(new NotFoundError());
  });
});
