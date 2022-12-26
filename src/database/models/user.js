const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  /**
   * User Model Class
   */
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * @param {Array} models all models
     * @returns {void} associate relationship
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wallet, { foreignKey: 'userID', as: 'wallets' });
    }
  }
  User.init(
    {
      nationalId: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      gender: DataTypes.ENUM('Male', 'Female'),
      dob: DataTypes.DATEONLY,
      password: DataTypes.STRING,
      confirmationToken: DataTypes.STRING,
      resetToken: DataTypes.STRING,
      confirmationSentAt: DataTypes.DATE,
      confirmationApproved: DataTypes.BOOLEAN,
      confirmationApprovedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      preferredLanguage: DataTypes.STRING,
      lastSignedInIpAddress: DataTypes.STRING,
      lastSignedInDate: DataTypes.DATE,
      loginCount: DataTypes.INTEGER,
      emailChangeToken: DataTypes.STRING,
      emailChangeNewEmail: DataTypes.STRING,
      emailChangedLastDate: DataTypes.DATE,
      role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      schema: 'Authentication',
    },
  );
  return User;
};
