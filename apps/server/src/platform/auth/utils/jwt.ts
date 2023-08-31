import jwt from 'jsonwebtoken';
import { type JWT, type Claims, ClaimsSchema } from '../auth.schema';

export type JWTConfig = { secret: string };
export type CreateJWTSigner = (config: JWTConfig) => JWTSigner;
export type JWTSigner = (payload: Claims) => JWT;

export const jwtSigner: CreateJWTSigner =
  ({ secret }): JWTSigner =>
  (payload: Claims) => {
    return jwt.sign(ClaimsSchema.parse(payload), secret, {
      expiresIn: '1h',
    });
  };

export type CreateJWTVerifier = (config: JWTConfig) => JWTVerifier;
export type JWTVerifier = (token: string) => Claims;

export const jwtVerifier: CreateJWTVerifier =
  ({ secret }): JWTVerifier =>
  (token) => {
    return ClaimsSchema.parse(jwt.verify(token, secret));
  };

export const jwtPair = ({ secret }: JWTConfig) => {
  return {
    sign: jwtSigner({ secret }),
    verify: jwtVerifier({ secret }),
  };
};
