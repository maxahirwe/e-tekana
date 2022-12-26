import models from '../database/models';

const { User, Wallet } = models;

const includeWallets = {
  model: Wallet,
  as: 'wallets',
};

/**
 * Class that provides user services
 */
class UserService {
  /**
   * Registers a user into the database
   * @param {Object} user
   * @returns {Object} Registered User
   */
  static register(user) {
    return User.create(user);
  }

  /**
   * @param  {Number} id
   * @returns {object} object
   */
  static findById(id) {
    return User.findByPk(id, {
      include: [includeWallets],
    });
  }

  /**
   * @param  {object} condition
   * @returns {object} object
   */
  static findBy(condition) {
    return User.findOne({
      where: condition,
      include: [includeWallets],
    });
  }
}

export default UserService;
