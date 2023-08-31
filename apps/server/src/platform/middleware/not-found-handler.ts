import { NotFoundError } from '@/platform/error';
import { Middleware } from '../types';

export const notFoundHandler = (): Middleware => (req, res, next) => {
  next(new NotFoundError());
};
