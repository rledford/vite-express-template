import { NextFunction, Request, Response } from 'express';
import { RequestContext } from '../context';

/**
 * Exposes a RequestContext to subsequent middlewares to get or set context data
 */
export const requestContextMiddleware =
  () => (req: Request, res: Response, next: NextFunction) => {
    req.context = new RequestContext();

    next();
  };
