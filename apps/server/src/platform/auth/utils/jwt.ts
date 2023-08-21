import jwt from 'jsonwebtoken';
import { JWT, TokenClaims, TokenClaimsSchema } from '../auth.schema';

export type JWTConfig = { secret: string };
export type CreateJWTSigner = (config: JWTConfig) => JWTSigner;
export type JWTSigner = (payload: TokenClaims) => JWT;

export const jwtSigner: CreateJWTSigner =
  ({ secret }): JWTSigner =>
  (payload: TokenClaims) => {
    return jwt.sign(TokenClaimsSchema.parse(payload), secret, {
      expiresIn: '1h',
    });
  };

export type CreateJWTVerifier = (config: JWTConfig) => JWTVerifier;
export type JWTVerifier = (token: string) => TokenClaims;

export const jwtVerifier: CreateJWTVerifier =
  ({ secret }): JWTVerifier =>
  (token) => {
    return TokenClaimsSchema.parse(jwt.verify(token, secret));
  };

export const jwtPair = ({ secret }: JWTConfig) => {
  return {
    sign: jwtSigner({ secret }),
    verify: jwtVerifier({ secret }),
  };
};
