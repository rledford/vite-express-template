import { DatabaseConnection } from '@/platform/database';
import { Middleware } from '@/platform/types';
import { userRepository } from './user.repository';
import { currentUserService, userService } from './services';
import {
  CurrentUserController,
  currentUserController,
  userController,
} from './controllers';
import { Router } from 'express';
import { JWTSigner } from '@/platform/auth';

export * from './user.schema';

export interface UserModule {
  controller: CurrentUserController;
}

export interface CurrentUserModule {
  controller: Router;
}

type UserDeps = {
  db: DatabaseConnection;
  jwtGuard: Middleware;
};

export const userModule = ({ db, jwtGuard }: UserDeps) => {
  const repository = userRepository({ db });
  const service = userService({ repository });
  const controller = userController({ service, jwtGuard });

  return {
    controller,
  };
};

type CurrentUserDeps = {
  db: DatabaseConnection;
  jwtGuard: Middleware;
  jwtSign: JWTSigner;
  basicGuard: Middleware;
};

export const currentUserModule = ({
  db,
  jwtGuard,
  basicGuard,
  jwtSign,
}: CurrentUserDeps) => {
  const repository = userRepository({ db });
  const service = currentUserService({ repository, sign: jwtSign });
  const controller = currentUserController({ service, jwtGuard, basicGuard });

  return {
    controller,
  };
};
