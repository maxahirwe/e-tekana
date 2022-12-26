import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import UserValidation from '../validations/user.validation';
import { checkUserDuplicate } from '../middlewares/user.middleware';

const router = Router();
router.post(
  '/register',
  validationMiddleware(UserValidation.registration),
  checkUserDuplicate,
  AuthController.register,
);

router.post(
  '/confirm',
  validationMiddleware(UserValidation.confirm),
  AuthController.confirmation,
);

router.post(
  '/login',
  validationMiddleware(UserValidation.login),
  AuthController.login,
);

export default router;
