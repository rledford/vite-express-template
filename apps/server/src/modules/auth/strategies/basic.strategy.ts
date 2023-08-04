import { NextFunction, Request, Response } from 'express';
import { BasicCredentialsSchema } from '../types';
import { BadRequestError, UnauthorizedError } from '@/errors';
import { Middleware } from '@/types';
import { UsersService } from '@/modules/users/services';
import { UserSchema } from '@/modules/users/dtos';

type Deps = {
  usersService: UsersService;
};

export const basicStrategy =
  ({ usersService }: Deps): Middleware =>
  async (req: Request, res: Response, next: NextFunction) => {
    const basic =
      req.headers.authorization?.replace(/^basic\s/i, '').trim() || '';

    const [username, password] = Buffer.from(basic, 'base64')
      .toString()
      .split(':');

    const credentials = basic ? { username, password } : req.body;
    const parsed = await BasicCredentialsSchema.safeParseAsync(credentials);

    if (!parsed.success)
      return next(new BadRequestError('Missing credentials'));

    // TODO: use service that joins user credentials
    const user = await usersService.findByUsername(parsed.data.username);

    if (!user) return next(new UnauthorizedError());

    req.user = UserSchema.parse(user);

    next();
  };
