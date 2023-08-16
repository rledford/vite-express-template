import { userService } from './user.service';
import { userController } from './user.controller';
import { userRepository } from './user.repository';
import { Middleware } from '@/types';
import { Database } from '@/platform/database';

type Deps = {
  db: Database;
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
