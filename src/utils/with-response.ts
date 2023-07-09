import type { NextFunction, Request, Response } from 'express';

type WithResponse = <T>(handler: AsyncHandler<T>) => WrappedHandler;
type AsyncHandler<T> = (req: Request, res?: Response) => Promise<T>;
type WrappedHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const withResData: WithResponse =
  (handler) => async (req, res, next) => {
    try {
      const data = await handler(req, res);
      res.status(200).json({ data });
      next();
    } catch (err) {
      next(err);
    }
  };

export const withResEmpty: WithResponse =
  (handler) => async (req, res, next) => {
    try {
      await handler(req, res);
      res.status(204);
      next();
    } catch (err) {
      next(err);
    }
  };
