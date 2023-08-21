import { requestHandlerSpy } from '@/test/spies';
import { RequestContext } from '../context';
import { Middleware } from '../types';
import { basicMiddleware } from './basic.middleware';
import { UnauthorizedError } from '../error';

describe('basicMiddleware', () => {
  let context: RequestContext;
  let middleware: Middleware;

  beforeEach(() => {
    context = new RequestContext();
    middleware = basicMiddleware();
  });

  it('should extract basic auth header and set credentials on request context', () => {
    const { req, res, next } = requestHandlerSpy(context);
    req.headers.authorization = `Basic ${Buffer.from(
      'username:password',
    ).toString('base64')}`;

    middleware(req, res, next);

    expect(req.context.credentials).toEqual({
      username: 'username',
      password: 'password',
    });
  });

  it('should only accept basic auth that is base64 encoded', () => {
    const { req, res, next } = requestHandlerSpy(context);
    req.headers.authorization = `Basic username:password`;
    middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });

  it('should call next with unauthorized error if credentials are missing', () => {
    const { req, res, next } = requestHandlerSpy(context);
    middleware(req, res, next);
    expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
  });
});
