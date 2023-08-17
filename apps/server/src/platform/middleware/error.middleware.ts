import { CustomError } from '@/platform/error';
import { FormattedError } from '@/platform/utils/error-formatter';
import { ErrorMiddleware } from './types';

type Deps = {
  formatError: (error: Error | CustomError) => FormattedError;
};

export const errorMiddleware =
  ({ formatError }: Deps): ErrorMiddleware =>
  /* must include `next` to match the signature express expects */
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  (err, req, res, next) => {
    const formattedError = formatError(err);
    const { statusCode } = formattedError.error;

    res.status(statusCode).json(formattedError);
  };
