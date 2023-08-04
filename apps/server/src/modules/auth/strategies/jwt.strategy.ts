import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors';
import { Middleware } from '@/types';
import { UsersService } from '@/modules/users/services';
import { TokenClaims } from '../types';

type Deps = {
  jwtSecret: string;
  usersService: UsersService;
};

export const jwtStrategy = ({ jwtSecret, usersService }: Deps): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.headers.authorization?.replace(/^bearer\s/i, '').trim() || '';

    const claims = jwt.verify(token, jwtSecret) as TokenClaims;
    const user = await usersService.findById(claims.user.id);

    if (!user) return next(new UnauthorizedError());

    req.user = claims.user;

    next();
  };
};
