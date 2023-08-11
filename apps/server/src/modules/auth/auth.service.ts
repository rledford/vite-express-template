import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors';
import { AuthRepository } from './auth.repository';
import {
  AuthToken,
  BasicCredentials,
  TokenClaims,
  TokenClaimsSchema
} from './types';
import { User } from '../database/types';

type Deps = {
  repository: AuthRepository;
  jwtSecret: string;
};

export interface AuthService {
  authenticate: (credentials: BasicCredentials) => Promise<AuthToken>;
  sign: (claims: TokenClaims) => AuthToken;
  verify: (token: AuthToken) => TokenClaims;
  register: (credentials: BasicCredentials) => Promise<User>;
}

export const authService = ({ repository, jwtSecret }: Deps): AuthService => {
  const sign = (claims: TokenClaims) =>
    jwt.sign(claims, jwtSecret, {
      expiresIn: '1h'
    });
  const verify = (token: AuthToken) =>
    TokenClaimsSchema.parse(jwt.verify(token, jwtSecret));

  return {
    authenticate: async (credentials) => {
      const userWithCredential = await repository.findUserWithCredential(
        credentials.username
      );
      try {
        return sign(TokenClaimsSchema.parse(userWithCredential));
      } catch (err) {
        // TODO: log error
        throw new UnauthorizedError();
      }
    },
    sign,
    verify: (token) => {
      try {
        return verify(token);
      } catch (err) {
        console.log(err);
        throw new UnauthorizedError();
      }
    },
    register: async (credentials) => {
      // TODO: hash password before inserting
      return repository.insertUserWithCredential(credentials);
    }
  };
};
