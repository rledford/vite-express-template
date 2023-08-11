import { Database } from '../database/types';
import { userService } from './user.service';
import { userController } from './user.controller';
import { userRepository } from './user.repository';

type Deps = {
  db: Database;
};

export const userModule = ({ db }: Deps) => {
  const repository = userRepository({ db });
  const service = userService({ repository });
  const controller = userController({ service });

  return {
    service,
    controller
  };
};
