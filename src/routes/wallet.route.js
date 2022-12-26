import { Router } from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import WalletValidation from '../validations/wallet.validation';
import WalletController from '../controllers/wallet.controller';

const router = Router();

router.use(authorizationMiddleware);

router.post(
  '/create',
  validationMiddleware(WalletValidation.create),
  WalletController.create,
);

router.get('/', WalletController.getAll);

export default router;
