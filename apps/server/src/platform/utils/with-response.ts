import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

type WithResponse = <T>(handler: AsyncHandler<T>) => WrappedHandler;
type AsyncHandler<T> = (req: Request, res?: Response) => Promise<T>;
type WrappedHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const withResData = <T extends z.AnyZodObject>(
  schema: T,
): WithResponse => {
  return (handler) => async (req, res, next) => {
    try {
      const result = await handler(req, res);

      const data = await (Array.isArray(result)
        ? Promise.all(result.map(async (d) => await schema.parseAsync(d)))
        : schema.parseAsync(result));

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };
};

export const withResEmpty: WithResponse =
  (handler) => async (req, res, next) => {
    try {
      await handler(req, res);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
