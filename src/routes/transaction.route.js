import { Router } from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware';
import validationMiddleware from '../middlewares/validation.middleware';
import TransactionValidation from '../validations/transaction.validation';
import {
  checkDuplicate,
  checkWallets,
} from '../middlewares/transaction.middleware';
import TransactionController from '../controllers/transaction.controller';

const router = Router();

router.use(authorizationMiddleware);

router.post(
  '/create',
  validationMiddleware(TransactionValidation.create),
  checkWallets,
  TransactionController.create,
);

router.post('/', TransactionController.getAll);

export default router;
