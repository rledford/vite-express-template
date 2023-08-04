import { jwtStrategy } from './strategies/jwt.strategy';
import { basicStrategy } from './strategies';
import { authController } from './controllers';
import { UsersService } from '../users/services';

type Deps = {
  jwtSecret: string;
  usersService: UsersService;
};

export const authModule = ({ jwtSecret, usersService }: Deps) => {
  const strategies = {
    jwtStrategy: jwtStrategy({ jwtSecret, usersService }),
    basicStrategy: basicStrategy({ usersService })
  };

  const controller = authController({ strategies, usersService });

  return {
    controller,
    strategies
  };
};
