import { CREATED, OK } from 'http-status';
import ResponseService from '../services/response.service';
import WalletService from '../services/wallet.service';
import { NODE_ENV, WALLET_STATUSES } from '../utils/variable';

/**
 * WalletController class
 */
class WalletController {
  /**
   * creation of wallers
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async create(req, res, next) {
    try {
      const { body, userData } = req;
      const userId = userData.id;
      const openingBalance =
        NODE_ENV.toLocaleLowerCase() === 'production' ? 0 : 10000; // TESTING PURPOSE
      const openinStatus =
        NODE_ENV.toLocaleLowerCase() === 'production'
          ? WALLET_STATUSES[0]
          : WALLET_STATUSES[1];
      const wallet = await WalletService.create({
        ...body,
        userId,
        status: openinStatus,
        balance: openingBalance,
      });
      ResponseService.handleSuccessResponse(
        CREATED,
        'wallet created',
        wallet,
        res,
      );
    } catch (err) {
      next(err);
    }
  }

  /**
   * get user wallets
   * @param  {object} req
   * @param  {object} res
   * @param  {Function} next
   * @returns {object} object
   */
  static async getAll(req, res, next) {
    try {
      const { userData } = req;
      const userId = userData.id;
      const wallets = await WalletService.findMany({
        userId,
      });
      ResponseService.handleSuccessResponse(OK, 'wallels', wallets, res);
    } catch (err) {
      next(err);
    }
  }
}

export default WalletController;
