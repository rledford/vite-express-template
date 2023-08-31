import type { BasicAuth, Claims } from '../auth';
import { InternalError } from '../error';
import { RequestContext } from './request.context';

describe('RequestContext', () => {
  const mockClaims: Claims = { sub: 'mock' };
  const mockBasicAuth: BasicAuth = {
    email: 'user@dev.local',
    password: 'password',
  };
  let context: RequestContext;

  beforeEach(() => {
    context = new RequestContext();
  });

  it('should allow getting claims after they are set', () => {
    context.claims = mockClaims;
    expect(context.claims).toEqual(mockClaims);
  });

  it('should throw if attempting to get claims that are not set', () => {
    expect(() => context.claims).toThrowError(expect.any(InternalError));
  });

  it('should allow getting auth after they are set', () => {
    context.auth = mockBasicAuth;
    expect(context.auth).toEqual(mockBasicAuth);
  });

  it('should throw if attempting to get auth that are not set', () => {
    expect(() => context.auth).toThrow(expect.any(InternalError));
  });
});
