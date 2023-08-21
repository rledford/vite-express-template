import { requestHandlerSpy } from '@/test/spies';
import { Middleware } from '../types';
import { requestContextMiddleware } from './request-context.middleware';
import { RequestContext } from '../context';

describe('requestContextMiddleware', () => {
  let middleware: Middleware;

  beforeEach(() => {
    middleware = requestContextMiddleware();
  });

  it('should set the context on the request', () => {
    const { req, res, next } = requestHandlerSpy();

    middleware(req, res, next);

    expect(req.context).toBeInstanceOf(RequestContext);
  });
});
