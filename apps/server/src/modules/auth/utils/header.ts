import { BadRequestError } from '@/errors';
import { BasicCredentials } from '@/modules/auth/types';
import { Request } from 'express';

export const getBasicCredentials = (req: Request): BasicCredentials => {
  const basic =
    req.headers.authorization?.replace(/^basic\s/i, '').trim() || '';

  const [username, password] = Buffer.from(basic, 'base64')
    .toString()
    .split(':');

  if (!username || !password) throw new BadRequestError('Missing credentials');

  return { username, password };
};

export const getBearerToken = (req: Request) => {
  const token =
    req.headers.authorization?.replace(/^bearer\s/i, '').trim() || '';

  if (!token) throw new BadRequestError('Missing token');

  return token;
};
