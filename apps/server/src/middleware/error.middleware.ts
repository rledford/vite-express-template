import { CustomError } from '@/platform/error';
import { FormattedError } from '@/utils/error-formatter';
import { NextFunction, Request, Response } from 'express';

type Deps = {
  formatError: (error: Error | CustomError) => FormattedError;
};

export const errorMiddleware =
  ({ formatError }: Deps) =>
  /* eslint-disable  @typescript-eslint/no-unused-vars*/
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    const formattedError = formatError(err);
    const { statusCode } = formattedError.error;

    res.status(statusCode).json(formattedError);
  };
