import express from 'express';
import { UserController } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { UserValidationSchema } from './user.validation';


const router = express.Router();

router.post(
  '/',

  validationRequest(UserValidationSchema),
  UserController.createUser,
);

export const UserRoutes = router;
