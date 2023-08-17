import { DatabaseConnection } from '@/platform/database';
import { Middleware } from '@/platform/middleware/types';
import { userService } from './user.service';
import { userController } from './user.controller';
import { userRepository } from './user.repository';

type Deps = {
  db: DatabaseConnection;
  jwt: Middleware;
};

export const userModule = ({ db, jwt }: Deps) => {
  const repository = userRepository({ db });
  const service = userService({ repository });
  const controller = userController({ service, jwt });

  return {
    service,
    controller
  };
};
