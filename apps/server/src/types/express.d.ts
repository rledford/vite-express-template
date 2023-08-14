import { UserClaim } from '@/modules/auth/models';

export {};

declare global {
  namespace Express {
    export interface Request {
      claims?: UserClaim;
      token?: string;
    }
    export interface Response {
      data?: unknown;
    }
  }
}
