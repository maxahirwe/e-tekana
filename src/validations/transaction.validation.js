import Joi from 'joi';

/**
 * Validation for trnsactions between wallets
 */
class TransactionValidation {
  /**
   * validates user object upon transaction creation
   * @param {Object} body
   * @returns {Joi.ValidationResult} Joi validation result
   */
  static async create(body) {
    const schema = Joi.object({
      originWalletId: Joi.number().integer().required(),
      destinationWalletId: Joi.number()
        .integer()
        .disallow(Joi.ref('originWalletId'))
        .required(),
      amount: Joi.number().integer().min(1).required(),
    });
    return schema.validate(body, { abortEarly: false });
  }
}
export default TransactionValidation;
