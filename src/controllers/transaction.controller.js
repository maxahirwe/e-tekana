import { CREATED, OK } from 'http-status';
import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import { NODE_ENV, TRANSACTIONS_STATUSES } from '../utils/variable';
import TransactionService from '../services/transaction.service';

/**
 * TransactionController class to manage transaction between wallets
 */
class TransactionController {
  /**
   * creation of transaction
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async create(req, res, next) {
    try {
      const { body } = req;
      const status =
        NODE_ENV.toLocaleLowerCase() === 'production'
          ? TRANSACTIONS_STATUSES[0]
          : TRANSACTIONS_STATUSES[1]; // TESTING PURPOSE
      const transaction = await TransactionService.create({
        ...body,
        transactionTimeStamp: new Date(),
        status,
      });
      ResponseService.handleSuccessResponse(
        CREATED,
        'transaction created',
        transaction,
        res,
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * get user transactions
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async getAll(req, res, next) {
    try {
      const { userData } = req;
      const userId = userData.id;
      const transactions = await TransactionService.findMany({
        [Op.or]: {
          '$originWallet.userId$': { [Op.eq]: userId },
          '$destinationWallet.userId$': { [Op.eq]: userId },
        },
      });
      ResponseService.handleSuccessResponse(
        OK,
        'user transactions',
        { totalTransaction: transactions.length, transactions },
        res,
      );
    } catch (err) {
      next(err);
    }
  }
}

export default TransactionController;
