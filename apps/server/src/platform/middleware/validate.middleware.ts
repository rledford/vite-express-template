import { z } from 'zod';
import { Middleware } from './types';

export const validateMiddleware =
  (schema: z.AnyZodObject): Middleware =>
  async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };
