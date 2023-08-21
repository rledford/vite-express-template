import { BasicCredentialsSchema } from '../auth';
import { UnauthorizedError } from '../error';
import { Middleware } from '../types';

export const basicMiddleware = (): Middleware => (req, res, next) => {
  const basic =
    req.headers.authorization?.replace(/^basic\s/i, '').trim() || '';

  const [username, password] = Buffer.from(basic, 'base64')
    .toString()
    .split(':');

  const credentials = BasicCredentialsSchema.safeParse({ username, password });

  if (!credentials.success)
    return next(new UnauthorizedError('Missing credentials'));

  req.context.credentials = credentials.data;

  next();
};
