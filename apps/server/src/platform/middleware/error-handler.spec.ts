import { requestHandlerSpy } from '@/test/spies';
import { errorFormatter } from '@/platform/utils/error-formatter';
import { errorHandler } from './error-handler';

describe('errorHandler', () => {
  const formatError = errorFormatter();
  const middleware = errorHandler({ formatError });

  it('should send a formatted json error response', () => {
    const { req, res, next } = requestHandlerSpy();
    const error = new Error();
    const formattedError = formatError(error);

    middleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(expect.any(Number));
    expect(res.json).toHaveBeenCalledWith({
      error: {
        ...formattedError.error,
        id: expect.any(String),
      },
    });
  });
});
