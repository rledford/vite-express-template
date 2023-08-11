import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@/types';
import { AuthToken, TokenClaims } from '../types';
import { getBearerToken } from '../utils';

type Deps = {
  verify: (token: AuthToken) => TokenClaims;
};

export const jwtGuard = ({ verify }: Deps): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = verify(getBearerToken(req));

      req.user = user;

      next();
    } catch (err) {
      // TODO: log error
      next(err);
    }
  };
};
