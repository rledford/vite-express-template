import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/platform/error';
import { AuthRepository } from './auth.repository';
import {
  BasicCredential,
  JWT,
  SignClaimsFn,
  UserClaims,
  UserClaimsSchema,
  VerifyJWTFn
} from './models';
import { hash } from './utils';

type Deps = {
  repository: AuthRepository;
  jwtSecret: string;
};

export interface AuthService {
  sign: SignClaimsFn;
  verify: VerifyJWTFn;
  register: (reg: BasicCredential) => Promise<JWT>;
  authenticate: (credentials: BasicCredential) => Promise<JWT>;
}

export const authService = ({ repository, jwtSecret }: Deps): AuthService => {
  const sign = (claims: UserClaims) =>
    jwt.sign(claims, jwtSecret, {
      expiresIn: '1h'
    });

  const verify = (token: JWT) =>
    UserClaimsSchema.parse(jwt.verify(token, jwtSecret));

  return {
    sign,
    verify: (token) => {
      try {
        return UserClaimsSchema.parse(verify(token));
      } catch (err) {
        throw new UnauthorizedError('Invalid token');
      }
    },
    register: async ({ username, password }) => {
      const pwd = await hash(password);

      const user = await repository.insert({
        username,
        hash: pwd
      });

      return sign(UserClaimsSchema.parse(user));
    },
    authenticate: async ({ username, password }) => {
      const pwd = await hash(password);
      const user = await repository.findByCredentials({ username, hash: pwd });

      if (!user) throw new UnauthorizedError();

      return sign(UserClaimsSchema.parse(user));
    }
  };
};
