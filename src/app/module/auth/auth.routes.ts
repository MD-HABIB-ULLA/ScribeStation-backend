import { Router } from 'express';

import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidationSchema } from '../user/user.validation';


const AuthRouter = Router();

AuthRouter.post(
  '/register',
  validationRequest(UserValidationSchema),
  AuthControllers.register,
);
AuthRouter.post(
  '/login',
  validationRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login,
);

export default AuthRouter;
