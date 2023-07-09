import { ErrorResponseDto } from '@/dtos';
import { CustomError } from '@/errors';
import { NextFunction, Request, Response } from 'express';

type Deps = {
  formatter: (error: Error | CustomError) => ErrorResponseDto;
};

export const errorMiddleware =
  ({ formatter }: Deps) =>
  /* eslint-disable  @typescript-eslint/no-unused-vars*/
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    const payload = formatter(err);

    res.status(payload.error.statusCode).json(payload);
  };
