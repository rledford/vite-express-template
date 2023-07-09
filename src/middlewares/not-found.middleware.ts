import { NotFoundError } from '@/errors';

export const notFoundMiddleware = () => () => {
  throw new NotFoundError();
};
