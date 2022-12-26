import models from '../database/models';

const { Wallet } = models;

/**
 * Class that provides Wallet services
 */
class WalletService {
  /**
   * Registers a wallet
   * @param {Object} wallet
   * @returns {Object} Registered User
   */
  static create(wallet) {
    return Wallet.create(wallet);
  }

  /**
   * @param  {Number} id
   * @returns {object} object
   */
  static findById(id) {
    return Wallet.findByPk(id, {
      include: [],
    });
  }

  /**
   * @param  {object} condition
   * @returns {object} object
   */
  static findBy(condition) {
    return Wallet.findOne({
      where: condition,
      include: [],
    });
  }

  /**
   * @param  {object} condition
   * @returns {object} object
   */
  static findMany(condition) {
    return Wallet.findAll({
      where: condition,
      include: [],
    });
  }
}

export default WalletService;
