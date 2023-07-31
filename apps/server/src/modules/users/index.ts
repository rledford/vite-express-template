import { Knex } from 'knex';
import { usersController } from './controllers';
import { usersService } from './services';

type Deps = {
  db: Knex;
};

export const usersModule = ({ db }: Deps) => {
  const service = usersService({ db });
  const controller = usersController({ service });

  return {
    controller
  };
};
