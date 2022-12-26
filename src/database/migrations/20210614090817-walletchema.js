module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('Wallet');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('Wallet');
  },
};
