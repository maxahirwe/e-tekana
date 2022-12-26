const {
  WALLET_STATUS,
  WALLET_TYPES,
  CURRENCIES,
} = require('../../utils/variable');

const walletTable = { schema: 'Wallet', tableName: 'Wallets' };
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(walletTable, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            schema: 'Authentication',
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      currency: {
        type: Sequelize.STRING(CURRENCIES),
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(20, 5),
        allowNull: false,
        defaultValue: 0,
      },
      type: {
        type: Sequelize.ENUM(WALLET_TYPES),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(WALLET_STATUS),
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
    await queryInterface.dropTable(walletTable);
  },
};
