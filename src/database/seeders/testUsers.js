const userTable = {
  schema: 'Authentication',
  tableName: 'Users',
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Populate DB with sample user
     *
     */
    await queryInterface.bulkInsert(
      userTable,
      [
        {
          nationalId: '1234567890123412',
          firstName: 'Max',
          lastName: 'A',
          email: 'user@sample.rw',
          phone: '+250788536943',
          gender: 'Male',
          dob: null,
          password:
            '$2b$10$Ce.AcQo9etFv.BtkXzlwhOrY6rQbmTxaz7rY.Xk7hWkn9ISBEBrLq',
          confirmationToken: '0d304cf5-f2a6-46d3-b397-e4c29efa5a1f',
          resetToken: null,
          confirmationSentAt: new Date(),
          confirmationApproved: true,
          confirmationApprovedAt: new Date(),
          preferredLanguage: 'en',
          lastSignedInIpAddress: null,
          lastSignedInDate: null,
          loginCount: 0,
          emailChangeToken: null,
          emailChangeNewEmail: null,
          emailChangedLastDate: null,
          role: 'customer',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.userTable('People', null, {});
  },
};
