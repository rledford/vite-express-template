import { NotFoundError } from '@/platform/error';

export const notFoundMiddleware = () => () => {
  throw new NotFoundError();
};
