import { NotFoundError } from '@/platform/error';
import { notFoundHandler } from './not-found-handler';
import { requestHandlerSpy } from '@/test/spies';

describe('notFoundHandler', () => {
  const middleware = notFoundHandler();

  it('should return a middleware function', () => {
    expect(middleware).toEqual(expect.any(Function));
  });

  it('should throw not found error', () => {
    const { req, res, next } = requestHandlerSpy();

    middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
  });
});
