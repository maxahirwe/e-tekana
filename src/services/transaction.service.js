import models from '../database/models';
import Utils from '../utils/index';

const { Transaction, Wallet } = models;

const includeOriginWallet = {
  model: Wallet,
  as: 'originWallet',
};

const includeDestinationWallet = {
  model: Wallet,
  as: 'destinationWallet',
};

/**
 * Class that provides Transaction serviceS
 */
class TransactionService {
  /**
   * Registers a Transaction
   * @param {Object} transactionBody
   * @returns {Object} Registered User
   */
  static async create(transactionBody) {
    return models.sequelize.transaction(async (transaction) => {
      const { originWalletId, destinationWalletId, amount } = transactionBody;

      // check transaction origin wallet
      const originWallet = await Wallet.findOne(
        { where: { id: originWalletId } },
        {
          transaction,
        },
      );
      if (!originWallet) {
        throw new Error('Error getting originWallet');
      }

      // check transaction destination wallet
      const destinationWallet = await Wallet.findOne(
        { where: { id: destinationWalletId } },
        {
          transaction,
        },
      );

      if (!destinationWallet) {
        throw new Error('Error getting destWallet');
      }

      // make sure all wallets have same currency
      if (originWallet.currency !== destinationWallet.currency) {
        throw new Error(
          `originWallet currency (${originWallet.currency}) must be the same as destinationWallet currency (${destinationWallet.currency})`,
        );
      }

      const newOriginBalance = originWallet.balance - amount;
      const newDestinationBalance = destinationWallet.balance + amount;
      if (newOriginBalance < 0) {
        throw new Error(
          `Insufficient balance(${originWallet.balance} ${originWallet.currency}) to make transaction of (${amount} ${originWallet.currency})`,
        );
      }

      // create transaction
      const transanctionCreation = await Transaction.create(
        {
          ...transactionBody,
          currency: originWallet.currency,
          refNumber: Utils.generateTransactionRefNumber(),
        },
        {
          transaction,
        },
      );

      // update origin wallet balance
      await Wallet.update(
        { balance: newOriginBalance },
        {
          where: {
            id: originWallet.id,
          },
          transaction,
        },
      );

      // update origin wallet balance
      await Wallet.update(
        { balance: newDestinationBalance },
        {
          where: {
            id: destinationWallet.id,
          },
          transaction,
        },
      );

      return transanctionCreation;
    });
  }

  /**
   * @param  {Number} id
   * @returns {object} object
   */
  static findById(id) {
    return Transaction.findByPk(id, {
      include: [includeOriginWallet, includeDestinationWallet],
    });
  }

  /**
   * @param  {object} condition
   * @returns {object} object
   */
  static findBy(condition) {
    return Transaction.findOne({
      where: condition,
      include: [includeOriginWallet, includeDestinationWallet],
    });
  }

  /**
   * @param  {object} condition
   * @returns {object} object
   */
  static findMany(condition) {
    return Transaction.findAll({
      where: condition,
      include: [includeOriginWallet, includeDestinationWallet],
    });
  }
}

export default TransactionService;
