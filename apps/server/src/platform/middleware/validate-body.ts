import { z } from 'zod';
import { Middleware } from '../types';
import { BadRequestError } from '../error';

export const validateBody =
  (schema: z.AnyZodObject): Middleware =>
  async (req, res, next) => {
    const validated = await schema.safeParseAsync(req.body);
    if (!validated.success) return next(new BadRequestError());
    req.body = validated.data;
    next();
  };
