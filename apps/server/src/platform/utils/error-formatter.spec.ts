import {
  BadRequestError,
  ForbiddenError,
  InternalError,
  NotFoundError,
  UnauthorizedError,
} from '@/platform/error';
import { loggerSpy } from '@/test/spies';
import { errorFormatter } from './error-formatter';

describe('errorFormatter', () => {
  describe('status codes', () => {
    const formatError = errorFormatter();

    it.each`
      error                      | expected
      ${new Error()}             | ${500}
      ${new InternalError()}     | ${500}
      ${new NotFoundError()}     | ${404}
      ${new ForbiddenError()}    | ${403}
      ${new UnauthorizedError()} | ${401}
      ${new BadRequestError()}   | ${400}
    `(
      'should have status code $expected when $error is formatted',
      ({ error, expected }) => {
        expect(formatError(error).error.statusCode).toBe(expected);
      },
    );
  });

  describe('logging', () => {
    const logger = loggerSpy();
    const formatError = errorFormatter({ logger });

    it('should log errors when configured with a logger', () => {
      formatError(new Error());
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('scrubbing internal errors', () => {
    const formatError = errorFormatter({ scrubInternal: true });
    const internalMessage = 'Internal error details';
    const expectedMessage = 'Internal error';

    it.each`
      error                                 | expected
      ${new Error(internalMessage)}         | ${expectedMessage}
      ${new InternalError(internalMessage)} | ${expectedMessage}
    `(
      'should have message $expected when $error is formatted',
      ({ error, expected }) => {
        expect(formatError(error).error.message).toBe(expected);
      },
    );
  });
});
