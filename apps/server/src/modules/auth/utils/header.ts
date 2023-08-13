import { Request } from 'express';
import { BadRequestError, UnauthorizedError } from '@/errors';
import { BasicCredentials, JWT } from '../models';

export const getBasicCredentials = (req: Request): BasicCredentials => {
  const basic =
    req.headers.authorization?.replace(/^basic\s/i, '').trim() || '';

  const [username, password] = Buffer.from(basic, 'base64')
    .toString()
    .split(':');

  const credentials = BasicCredentials.safeParse({ username, password });

  if (!credentials.success) throw new BadRequestError('Missing credentials');

  return credentials.data;
};

export const getBearerToken = (req: Request): JWT => {
  const token = JWT.safeParse(
    req.headers.authorization?.replace(/^bearer\s/i, '').trim() || ''
  );

  if (!token.success) throw new UnauthorizedError('Missing token');

  return token.data;
};
