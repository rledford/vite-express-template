import { DatabaseConnection } from '@/platform/database';
import { Middleware } from '@/platform/types';
import { userRepository } from './user.repository';
import { userService } from './user.service';
import { UserController, userController } from './user.controller';
import { JWTSigner } from '@/platform/auth';

export * from './user.dto';

export interface UserModule {
  controller: UserController;
}

type UserDeps = {
  db: DatabaseConnection;
  sign: JWTSigner;
  setClaimsContext: Middleware;
  setAuthContext: Middleware;
};

export const userModule = ({
  db,
  sign,
  setClaimsContext,
  setAuthContext,
}: UserDeps) => {
  const repository = userRepository({ db });
  const service = userService({ repository, sign });
  const controller = userController({
    service,
    setClaimsContext,
    setAuthContext,
  });

  return {
    controller,
  };
};
