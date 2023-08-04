import { UsersService } from '@/modules/users/services';

export interface RegistrationService {
  register: () => void;
}

type Deps = {
  usersService: UsersService;
};

export const registrationService = ({
  usersService
}: Deps): RegistrationService => {
  // TODO: implement methods
  return {
    register: () => undefined
  };
};
