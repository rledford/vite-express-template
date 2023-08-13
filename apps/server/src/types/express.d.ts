import { UserClaims } from '@/modules/auth/models';

export {};

declare global {
  namespace Express {
    export interface Request {
      claims?: UserClaims;
      token?: string;
    }
    export interface Response {
      data?: unknown;
    }
  }
}
