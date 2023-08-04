import { AuthToken, BasicCredentials } from '@/modules/auth/types';
import { UserDTO } from '@/modules/users/dtos';

export {};

declare global {
  namespace Express {
    export interface Request {
      user?: UserDTO;
      credentials?: BasicCredentials;
      token?: AuthToken;
    }
    export interface Response {
      data?: unknown;
    }
  }
}
