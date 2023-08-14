import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@/errors';
import { AuthRepository } from './auth.repository';
import {
  BasicCredential,
  JWT,
  SignClaimsFn,
  UserClaim,
  UserClaimSchema,
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
  const sign = (claims: UserClaim) =>
    jwt.sign(claims, jwtSecret, {
      expiresIn: '1h'
    });

  const verify = (token: JWT) =>
    UserClaimSchema.parse(jwt.verify(token, jwtSecret));

  return {
    sign,
    verify: (token) => {
      try {
        return UserClaimSchema.parse(verify(token));
      } catch (err) {
        console.log(err);
        throw new UnauthorizedError('Invalid token');
      }
    },
    authenticate: async ({ username, password }) => {
      const pwd = await hash(password);
      const user = await repository.findByCredentials({ username, hash: pwd });

      if (!user) throw new UnauthorizedError();

      return sign(UserClaimSchema.parse(user));
    },
    register: async ({ username, password }) => {
      const pwd = await hash(password);

      const user = await repository.insert({
        username,
        hash: pwd
      });

      return sign(UserClaimSchema.parse(user));
    }
  };
};
