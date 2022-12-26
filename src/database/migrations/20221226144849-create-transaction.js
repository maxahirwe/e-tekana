const { CURRENCIES, TRANSACTIONS_STATUSES } = require('../../utils/variable');

const walletTable = { schema: 'Wallet', tableName: 'Wallets' };
const transactionTable = { schema: 'Wallet', tableName: 'Transactions' };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(transactionTable, {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      refNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      originWalletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'Wallet',
            tableName: 'Wallets',
          },
          key: 'id',
        },
      },
      destinationWalletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'Wallet',
            tableName: 'Wallets',
          },
          key: 'id',
        },
      },
      currency: {
        type: Sequelize.ENUM(CURRENCIES),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(20, 5),
        allowNull: false,
      },
      transactionTimeStamp: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(TRANSACTIONS_STATUSES),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(transactionTable);
  },
};
