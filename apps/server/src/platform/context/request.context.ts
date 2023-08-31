import type { BasicAuth, Claims } from '../auth';
import { InternalError } from '../error';

export class RequestContext {
  private _claims?: Claims;
  private _auth?: BasicAuth;

  get claims() {
    if (!this._claims)
      throw new InternalError(
        'Attempted to access claims before they were set',
      );

    return this._claims;
  }

  set claims(data: Claims) {
    this._claims = data;
  }

  get auth() {
    if (!this._auth)
      throw new InternalError('Attempted to access auth before it was set');

    return this._auth;
  }

  set auth(data: BasicAuth) {
    this._auth = data;
  }
}
