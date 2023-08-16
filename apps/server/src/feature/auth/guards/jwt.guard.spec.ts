import { NextFunction, Request, Response } from 'express';
import { expressSpy } from '@/test/spies';
import { jwtGuard } from './jwt.guard';
import { UserClaims } from '../models';

describe('jwtGuard', () => {
  const verifySpy = vi.fn();
  const guard = jwtGuard({ verify: verifySpy });

  const mockClaims: UserClaims = {
    id: 1,
    username: 'mock'
  };

  let reqSpy: Request;
  let resSpy: Response;
  let nextSpy: NextFunction;

  beforeEach(() => {
    ({ req: reqSpy, res: resSpy, next: nextSpy } = expressSpy());

    reqSpy.headers = { authorization: 'mock' };
  });

  it('should set the request claims if verified and call next', async () => {
    verifySpy.mockReturnValueOnce(mockClaims);

    await guard(reqSpy, resSpy, nextSpy);

    expect(reqSpy.claims).toStrictEqual(mockClaims);
    expect(nextSpy).toHaveBeenCalledWith();
  });

  it('should throw if token is invalid', async () => {
    const err = new Error();
    verifySpy.mockImplementationOnce(() => {
      throw err;
    });

    await guard(reqSpy, resSpy, nextSpy);

    expect(reqSpy.claims).toBe(undefined);
    expect(nextSpy).toHaveBeenCalledWith(err);
  });
});
