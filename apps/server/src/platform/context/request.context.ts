import { BasicCredentials, TokenClaims } from '../auth';
import { InternalError } from '../error';

export class RequestContext implements RequestContext {
  private _claims?: TokenClaims;
  private _credentials?: BasicCredentials;

  get claims() {
    if (!this._claims)
      throw new InternalError(
        'Attempted to access claims before they were set',
      );

    return this._claims;
  }
  set claims(data: TokenClaims) {
    this._claims = data;
  }

  get credentials() {
    if (!this._credentials)
      throw new InternalError(
        'Attempted to access credentials before they were set',
      );

    return this._credentials;
  }
  set credentials(data: BasicCredentials) {
    this._credentials = data;
  }
}
