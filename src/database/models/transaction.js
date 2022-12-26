const { Model } = require('sequelize');
const { CURRENCIES, TRANSACTIONS_STATUSES } = require('../../utils/variable');

module.exports = (sequelize, DataTypes) => {
  /**
   * Transaction Model Class
   */
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      Transaction.belongsTo(models.Wallet, {
        foreignKey: 'originWalletId',
        as: 'originWallet',
      });
      Transaction.belongsTo(models.Wallet, {
        foreignKey: 'destinationWalletId',
        as: 'destinationWallet',
      });
    }
  }
  Transaction.init(
    {
      refNumber: DataTypes.STRING,
      originWalletId: DataTypes.INTEGER,
      destinationWalletId: DataTypes.INTEGER,
      currency: DataTypes.ENUM(CURRENCIES),
      amount: DataTypes.DECIMAL(20, 5),
      transactionTimeStamp: DataTypes.DECIMAL(20, 5),
      status: DataTypes.ENUM(TRANSACTIONS_STATUSES),
    },
    {
      sequelize,
      modelName: 'Transaction',
      schema: 'Wallet',
    },
  );
  return Transaction;
};
