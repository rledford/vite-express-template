import { Router } from 'express';
import { RegistrationService } from '../services';

type Deps = {
  service: RegistrationService;
};

export const registrationController = ({ service }: Deps) => {
  const router = Router();
  // TODO: implement routes with service calls
  return router;
};
