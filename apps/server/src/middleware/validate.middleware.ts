import { Middleware } from '@/types';
import { z } from 'zod';

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
