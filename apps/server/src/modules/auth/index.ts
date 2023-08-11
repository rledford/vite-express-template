import { Database } from '../database/types';
import { AuthController, authController } from './auth.controller';
import { authRepository } from './auth.repository';
import { authService } from './auth.service';
import { Middleware } from '@/types';
import { jwtGuard } from './guards';

type Deps = {
  db: Database;
  jwtSecret: string;
};

interface AuthModule {
  controller: AuthController;
  guards: {
    jwt: Middleware;
  };
}

export const authModule = ({ db, jwtSecret }: Deps): AuthModule => {
  const repository = authRepository({ db });
  const service = authService({ repository, jwtSecret });
  const jwt = jwtGuard({ verify: service.verify });

  const controller = authController({
    service,
    jwt
  });

  return {
    controller,
    guards: {
      jwt
    }
  };
};
