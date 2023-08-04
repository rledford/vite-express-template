import { UsersService } from '../users/services';
import { registrationService } from './services';
import { registrationController } from './controllers';

type Deps = {
  usersService: UsersService;
};

export const registrationModule = ({ usersService }: Deps) => {
  const service = registrationService({ usersService });
  const controller = registrationController({ service });
  return {
    controller
  };
};
