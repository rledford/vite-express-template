import { expressSpy } from '@/test/spies';
import { errorFormatter } from '@/platform/utils/error-formatter';
import { errorMiddleware } from './error.middleware';

describe('errorMiddleware', () => {
  const formatError = errorFormatter();
  const middleware = errorMiddleware({ formatError });

  it('should send a formatted json error response', () => {
    const { req, res, next } = expressSpy();
    const error = new Error();
    const formattedError = formatError(error);

    middleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(expect.any(Number));
    expect(res.json).toHaveBeenCalledWith({
      error: {
        ...formattedError.error,
        id: expect.any(String)
      }
    });
  });
});
