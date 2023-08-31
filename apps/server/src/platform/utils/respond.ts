import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { NotFoundError } from '../error';

type WithResponse = <T>(handler: AsyncHandler<T | undefined>) => WrappedHandler;
type AsyncHandler<T> = (req: Request, res?: Response) => Promise<T>;
type WrappedHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

/**
 * Parses the result of the `handler` with the provided `schema` and sends
 * `200` status with `json` data.
 *
 * Responds with `404` and `json` error if result is undefined.
 *
 * Responds with `500` if schema parsing fails
 */
export const respondJSON =
  (schema: z.AnyZodObject): WithResponse =>
  (handler) =>
  async (req, res, next) => {
    try {
      const result = await handler(req);

      if (!result) return next(new NotFoundError());

      const data = Array.isArray(result)
        ? await Promise.all(result.map((d) => schema.parseAsync(d)))
        : await schema.parseAsync(result);

      res.status(200).json({ data });
    } catch (err) {
      next(err);
    }
  };

export const respondEmpty: WithResponse =
  (handler) => async (req, res, next) => {
    try {
      await handler(req, res);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  };
