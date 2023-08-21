import { BasicCredentials, TokenClaims } from '../auth';
import { InternalError } from '../error';
import { RequestContext } from './request.context';

describe('RequestContext', () => {
  const mockClaims: TokenClaims = { id: 1, username: 'user' };
  const mockCredentials: BasicCredentials = {
    username: 'user',
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

  it('should allow getting credentials after they are set', () => {
    context.credentials = mockCredentials;
    expect(context.credentials).toEqual(mockCredentials);
  });

  it('should throw if attempting to get credentials that are not set', () => {
    expect(() => context.credentials).toThrow(expect.any(InternalError));
  });
});
