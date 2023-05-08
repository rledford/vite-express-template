import type { NextFunction, Request, Response } from 'express';

type AsyncHandler = (req: Request, res: Response) => Promise<void>;
type WithErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const withErrorHandling =
  (handler: AsyncHandler): WithErrorHandler =>
  async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(err);
    }
  };
