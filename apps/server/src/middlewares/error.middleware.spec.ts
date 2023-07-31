import { expressSpy } from '@/test/spies';
import { createErrorFormatter } from '@/utils/error-formatter';
import { errorMiddleware } from './error.middleware';

describe('errorMiddleware', () => {
  const errorFormatter = createErrorFormatter();
  const middleware = errorMiddleware({ formatter: errorFormatter });

  it('should send a formatted json error response', () => {
    const { req, res, next } = expressSpy();
    const error = new Error();
    const formattedError = errorFormatter(error);

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
