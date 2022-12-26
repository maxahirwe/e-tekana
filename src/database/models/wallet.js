const { Model } = require('sequelize');
const {
  WALLET_STATUSES,
  WALLET_TYPES,
  CURRENCIES,
} = require('../../utils/variable');

module.exports = (sequelize, DataTypes) => {
  /**
   * Wallet Model Class
   */
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      Wallet.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Wallet.init(
    {
      userId: DataTypes.INTEGER,
      type: DataTypes.ENUM(WALLET_TYPES),
      status: DataTypes.ENUM(WALLET_STATUSES),
      currency: DataTypes.ENUM(CURRENCIES),
      balance: DataTypes.DECIMAL(20, 5),
    },
    {
      sequelize,
      modelName: 'Wallet',
      schema: 'Wallet',
    },
  );
  return Wallet;
};
