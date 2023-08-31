import { requestHandlerSpy } from '@/test/spies';
import { RequestContext } from '../context';
import { Middleware } from '../types';
import { UnauthorizedError } from '../error';
import { basicAuthContext } from './basic-auth-context';

describe('basicAuthContext', () => {
  let context: RequestContext;
  let middleware: Middleware;

  beforeEach(() => {
    context = new RequestContext();
    middleware = basicAuthContext();
  });

  it('should extract basic auth header and set credentials on request context', () => {
    const { req, res, next } = requestHandlerSpy(context);
    req.headers.authorization = `Basic ${Buffer.from(
      'email@test.local:password',
    ).toString('base64')}`;

    middleware(req, res, next);

    expect(req.context.auth).toEqual({
      email: 'email@test.local',
      password: 'password',
    });
  });

  it('should only accept basic auth that is base64 encoded', () => {
    const { req, res, next } = requestHandlerSpy(context);
    req.headers.authorization = `Basic email@test.local:password`;
    middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it('should call next with unauthorized error if credentials are missing', () => {
    const { req, res, next } = requestHandlerSpy(context);
    middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
