import { requestHandlerSpy } from '@/test/spies';
import { Middleware } from '../types';
import { requestContext } from './request-context';
import { RequestContext } from '../context';

describe('requestContext', () => {
  let middleware: Middleware;

  beforeEach(() => {
    middleware = requestContext();
  });

  it('should set the context on the request', () => {
    const { req, res, next } = requestHandlerSpy();

    middleware(req, res, next);

    expect(req.context).toBeInstanceOf(RequestContext);
  });
});
