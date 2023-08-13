import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors';
import { AuthRepository } from './auth.repository';
import {
  BasicCredentials,
  JWT,
  SignClaimsFn,
  UserClaims,
  VerifyJWTFn
} from './models';
import { hash } from './utils';

type Deps = {
  repository: AuthRepository;
  jwtSecret: string;
};

export interface AuthService {
  authenticate: (credentials: BasicCredentials) => Promise<JWT>;
  sign: SignClaimsFn;
  verify: VerifyJWTFn;
  register: (reg: BasicCredentials) => Promise<JWT>;
}

export const authService = ({ repository, jwtSecret }: Deps): AuthService => {
  const sign = (claims: UserClaims) =>
    jwt.sign(claims, jwtSecret, {
      expiresIn: '1h'
    });

  const verify = (token: JWT) => UserClaims.parse(jwt.verify(token, jwtSecret));

  return {
    sign,
    verify: (token) => {
      try {
        return UserClaims.parse(verify(token));
      } catch (err) {
        console.log(err);
        throw new UnauthorizedError('Invalid token');
      }
    },
    authenticate: async ({ username, password }) => {
      const pwd = await hash(password);
      const user = await repository.findByCredentials({ username, hash: pwd });

      if (!user) throw new UnauthorizedError();

      return sign(UserClaims.parse(user));
    },
    register: async ({ username, password }) => {
      const pwd = await hash(password);

      const user = await repository.insert({
        username,
        hash: pwd
      });

      return sign(UserClaims.parse(user));
    }
  };
};
