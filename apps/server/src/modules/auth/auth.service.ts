import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors';
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
  authenticate: (credentials: BasicCredential) => Promise<JWT>;
  sign: SignClaimsFn;
  verify: VerifyJWTFn;
  register: (reg: BasicCredential) => Promise<JWT>;
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
        console.log(err);
        throw new UnauthorizedError('Invalid token');
      }
    },
    authenticate: async ({ username, password }) => {
      const pwd = await hash(password);
      const user = await repository.findByCredentials({ username, hash: pwd });

      if (!user) throw new UnauthorizedError();

      return sign(UserClaimsSchema.parse(user));
    },
    register: async ({ username, password }) => {
      const pwd = await hash(password);

      const user = await repository.insert({
        username,
        hash: pwd
      });

      return sign(UserClaimsSchema.parse(user));
    }
  };
};
