import { z } from 'zod';
import { Middleware } from './types';

// TODO: Add specs

export const validate =
  (schema: z.AnyZodObject): Middleware =>
  async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };

export const validateWithCurrentUser =
  (schema: z.AnyZodObject): Middleware =>
  async (req, res, next) => {
    try {
      req.body = await schema.parseAsync({
        userId: req.claims?.id,
        ...req.body,
      });

      next();
    } catch (err) {
      next(err);
    }
  };
