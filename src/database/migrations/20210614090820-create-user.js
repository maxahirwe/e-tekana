const { SUPPORTED_LANGUAGES } = require('../../utils/variable');

const userTable = {
  schema: 'Authentication',
  tableName: 'Users',
};
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(userTable, {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nationalId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      role: {
        type: Sequelize.ENUM('customer', 'admin'),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: true,
      },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      confirmationToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetToken: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      confirmationSentAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      confirmationApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      confirmationApprovedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      preferredLanguage: {
        type: Sequelize.ENUM(SUPPORTED_LANGUAGES),
        defaultValue: SUPPORTED_LANGUAGES[0],
        allowNull: true,
      },
      loginCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      lastSignedInDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastSignedInIpAddress: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      emailChangeToken: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      emailChangeNewEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      emailChangedLastDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(userTable);
  },
};
