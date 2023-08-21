import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@/platform/types';
import { UnauthorizedError } from '@/platform/error';
import { JWTVerifier } from '../auth';

type Deps = {
  verify: JWTVerifier;
};

export const jwtMiddleware = ({ verify }: Deps): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token =
        req.headers.authorization?.replace(/^bearer\s/i, '').trim() || '';
      req.context.claims = verify(token);

      next();
    } catch (err) {
      next(new UnauthorizedError('Invalid token'));
    }
  };
};
