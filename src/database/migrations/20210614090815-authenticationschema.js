module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createSchema('Authentication');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropSchema('Authentication');
  },
};
