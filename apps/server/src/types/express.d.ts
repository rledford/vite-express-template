import { AuthToken } from '@/modules/auth/types';
import { UserDTO } from '@/modules/user/dtos';

export {};

declare global {
  namespace Express {
    export interface Request {
      // TODO: change to claims
      user?: UserDTO;
      token?: AuthToken;
    }
    export interface Response {
      data?: unknown;
    }
  }
}
