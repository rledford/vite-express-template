import { NotFoundError } from '@/platform/error';
import { Middleware } from './types';

export const notFoundMiddleware = (): Middleware => (req, res, next) => {
  next(new NotFoundError());
};
