import { UnauthorizedError } from '../error';
import { Middleware } from '../types';
import { BasicAuthSchema } from '../auth';

export const basicAuthContext = (): Middleware => (req, res, next) => {
  const basic =
    req.headers.authorization?.replace(/^basic\s/i, '').trim() || '';

  const [email, password] = Buffer.from(basic, 'base64').toString().split(':');

  const credentials = BasicAuthSchema.safeParse({ email, password });

  if (!credentials.success)
    return next(new UnauthorizedError('Missing credentials'));

  req.context.auth = credentials.data;

  next();
};
