import { NextFunction, Request, Response } from 'express';
import { TokenClaims } from '../auth';
import { jwtMiddleware } from './jwt.middleware';
import { requestHandlerSpy } from '@/test/spies';
import { UnauthorizedError } from '../error';
import { RequestContext } from '../context';

describe('jwtMiddleware', () => {
  const verifySpy = vi.fn();
  const middleware = jwtMiddleware({ verify: verifySpy });

  const mockClaims: TokenClaims = {
    id: 1,
    username: 'mock',
  };

  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    ({ req, res, next } = requestHandlerSpy(new RequestContext()));
    req.headers = { authorization: 'mock' };
  });

  it('should set the request context claims if verified and call next', async () => {
    verifySpy.mockReturnValueOnce(mockClaims);

    await middleware(req, res, next);

    expect(req.context.claims).toStrictEqual(mockClaims);
    expect(next).toHaveBeenCalledWith();
  });

  it('should call next with unauthorized error if token is invalid', async () => {
    verifySpy.mockImplementationOnce(() => {
      throw new Error();
    });

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
