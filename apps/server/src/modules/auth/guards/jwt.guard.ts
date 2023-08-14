import { NextFunction, Request, Response } from 'express';
import { Middleware } from '@/types';
import { getBearerToken } from '../utils';
import { UserClaimsSchema, VerifyJWTFn } from '../models';

type Deps = {
  verify: VerifyJWTFn;
};

export const jwtGuard = ({ verify }: Deps): Middleware => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.claims = UserClaimsSchema.parse(verify(getBearerToken(req)));

      next();
    } catch (err) {
      // TODO: use logger
      next(err);
    }
  };
};
