import { CONFLICT, BAD_REQUEST } from 'http-status';
import ResponseService from '../services/response.service';
import TransactionService from '../services/transaction.service';
import WalletService from '../services/wallet.service';

export const checkDuplicate = async (req, res, next) => {
  try {
    const { body } = req;
    const { refNumber } = body;
    const exists = await TransactionService.findBy({ refNumber });
    if (exists) {
      return ResponseService.handleErrorResponse(
        CONFLICT,
        `Transaction with reference number(${refNumber}) already exists`,
        res,
      );
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const checkWallets = async (req, res, next) => {
  try {
    const { body, userData } = req;
    const { originWalletId, destinationWalletId } = body;
    const userId = userData.id; // user can only initiate transactions from their own wallets
    const OriginWallet = await WalletService.findBy({
      id: originWalletId,
      userId,
    });
    const destinationWallet = await WalletService.findBy({
      id: destinationWalletId,
    });
    if (!OriginWallet) {
      return ResponseService.handleErrorResponse(
        BAD_REQUEST,
        `originWalletId (${originWalletId}) provided does not exist`,
        res,
      );
    }
    if (!destinationWallet) {
      return ResponseService.handleErrorResponse(
        BAD_REQUEST,
        `destinationWallet (${destinationWallet}) provided does not exist`,
        res,
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};
