import {
  BadRequestError,
  ForbiddenError,
  InternalError,
  NotFoundError,
  UnauthorizedError
} from '@/errors';
import { loggerSpy } from '@/test/spies';
import { createErrorFormatter } from './error-formatter';

describe('errorFormatter', () => {
  describe('status codes', () => {
    const formatter = createErrorFormatter();

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
        expect(formatter(error).error.statusCode).toBe(expected);
      }
    );
  });

  describe('logging', () => {
    const logger = loggerSpy();
    const formatter = createErrorFormatter({ logger });

    it('should log errors when configured with a logger', () => {
      formatter(new Error());
      expect(logger.error).toHaveBeenCalled();
    });
  });

  describe('scrubbing internal errors', () => {
    const formatter = createErrorFormatter({ scrubInternal: true });
    const internalMessage = 'Internal error details';
    const expectedMessage = 'Internal error';

    it.each`
      error                                 | expected
      ${new Error(internalMessage)}         | ${expectedMessage}
      ${new InternalError(internalMessage)} | ${expectedMessage}
    `(
      'should have message $expected when $error is formatted',
      ({ error, expected }) => {
        expect(formatter(error).error.message).toBe(expected);
      }
    );
  });
});
