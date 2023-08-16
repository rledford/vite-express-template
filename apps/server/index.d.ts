import { JWT, UserClaims } from '@/feature/auth/models';

export {};

declare global {
  namespace Express {
    export interface Request {
      claims?: UserClaims;
      token?: JWT;
    }
    export interface Response {
      data?: unknown;
    }
  }
}
